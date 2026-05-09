import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '@environments/environment';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService } from './_services';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent
  ],
  providers: [
    // APP_INITIALIZER: runs appInitializer before the app starts (attempts silent refresh)
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    // JWT interceptor: adds Authorization header to outgoing API requests
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // Error interceptor: auto-logout on 401/403 responses
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // IMPORTANT: only include in non-production builds
    // In production this interceptor must NOT run — the real backend handles the calls
    ...(environment.production ? [] : [fakeBackendProvider])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }