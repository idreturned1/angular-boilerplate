import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { applicationUrls } from 'src/app/_helpers/urls';
import { Utils } from 'src/app/_helpers/utilities';

@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
    private _requestCount = 0;
    private _storageHelper = Utils.storageHelper;

    constructor(private _router: Router) {}

    errorHandler = catchError((error, caught) => {
        let errorMsg = null;

        if (error.status == 0) {
            errorMsg = 'Connectivity Error :P';
            console.log(errorMsg);
        } else if (error.status == 401) {
            errorMsg = 'Invalid Authorization';
            // show toast
            this._storageHelper.clear();
            location.reload();
        }

        return throwError(error);
    }) as any;

    successHandler = map<any, any>((res) => {
        if (res.hasOwnProperty('body')) {
            // loader handling
        }
        return res;
    });

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const shouldHaveToken: boolean =
            this._storageHelper.userInfo &&
            this._storageHelper.userInfo.access_token &&
            this._storageHelper.userInfo.access_token.length > 0;

        // TODO: Code for refresh token
        // if (request.url.indexOf(applicationUrls.tokenRefreshUrl) >= 0) {
        //     request = this.addAuthorizationHeader(
        //         request,
        //         this._storageHelper.userInfo.refresh_token
        //     );
        //     return next
        //         .handle(request)
        //         .pipe(this.successHandler, this.errorHandler) as Observable<
        //         HttpEvent<any>
        //     >;
        // }

        return from(
            shouldHaveToken ? this.getAccessToken() : Promise.resolve(null)
        ).pipe(
            switchMap((access_token: string) => {
                request = this.addAuthorizationHeader(request, access_token);

                return next
                    .handle(request)
                    .pipe(this.successHandler, this.errorHandler) as Observable<
                    HttpEvent<any>
                >;
            })
        );
    }

    private addAuthorizationHeader(
        request: HttpRequest<any>,
        access_token?: string
    ) {
        const newHeaders = {};
        if (access_token) {
            newHeaders['Authorization'] = access_token;
        } else if (
            this._storageHelper.userInfo &&
            this._storageHelper.userInfo.access_token
        ) {
            newHeaders['Authorization'] =
                this._storageHelper.userInfo.access_token;
        }
        request = request.clone({ setHeaders: newHeaders });
        return request;
    }

    private async getAccessToken(): Promise<string> {
        // TODO: Refresh token
        // if (
        //     new Date().getTime() >=
        //     +this._storageHelper.userInfo.access_token_expiry
        // ) {
        //     const response = await this.authService.refreshToken();
        //     let userInfo = this._storageHelper.userInfo;
        //     userInfo.access_token = response.access_token;
        //     Utils.storageHelper.userInfo = userInfo;
        //     return response.access_token;
        // } else {
        //     return this._storageHelper.userInfo.access_token;
        // }
        return this._storageHelper.userInfo.access_token;
    }
}
