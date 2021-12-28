import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './_shared/interceptors/http-interceptor/http-interceptor.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
    ],
    providers: [
        [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpInterceptorService,
                multi: true,
            },
        ],
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
