import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from 'src/app/services';

@Injectable({
  providedIn: 'root',
})
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.accountService.logout();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
