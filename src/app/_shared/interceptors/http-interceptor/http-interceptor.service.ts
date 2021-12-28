import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Utils } from 'src/app/_helpers/utilities';

@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService {
    constructor() {}

    errorHandler = catchError((error, caught) => {
        // Add error checks here

        return throwError(error);
    }) as any;

    successHandler = map<any, any>((res) => {
        // Add success checks here

        return res;
    });

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const userInfo = Utils.storageHelper.userInfo;
        const access_token = userInfo.access_token;

        if (
            access_token &&
            access_token.length &&
            !request.headers.get('Authorization')
        ) {
            request = this.addAuthorizationHeaders(request, access_token);
        }
        return next
            .handle(request)
            .pipe(this.successHandler, this.errorHandler) as Observable<
            HttpEvent<any>
        >;
    }

    addAuthorizationHeaders(
        request: HttpRequest<any>,
        access_token?: string
    ): HttpRequest<any> {
        if (access_token && access_token.length) {
            const newHeaders = {};
            newHeaders['Authorization'] = `Bearer ${access_token}`;
            request = request.clone({
                setHeaders: newHeaders,
            });
        }
        return request;
    }
}
