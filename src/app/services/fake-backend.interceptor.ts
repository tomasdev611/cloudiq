import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { USERS } from '../constants';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/login') && method === 'POST':
          return authenticate();
        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { email, password } = body;
      const user = USERS.find((x: any) => x.email === email && x.password === password);
      if (!user) return error({error: 'Email or password is incorrect'});
      return ok({
        id: user.id,
        email: user.email,
        name: user.name,
        token: 'fake-token'
      });
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: any) {
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};