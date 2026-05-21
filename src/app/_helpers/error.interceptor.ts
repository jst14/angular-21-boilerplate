import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.accountService.accountValue) {
        // auto logout if 401 or 403 response returned from api
        this.accountService.logout();
      }

      const error = (err && err.error && err.error.message) || err.statusText;

      // Don't log expected 401 from refresh-token on startup (normal when no session exists)
      const isStartupRefresh = err.status === 401 && request.url.includes('/accounts/refresh-token');
      if (!isStartupRefresh) {
        console.error(err);
      }

      return throwError(() => error);
    }))
  }
}