import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { AccountService } from 'src/app/services';
import {
  Login,
  LoginSuccess,
  LoginFailure,
  AccountActionTypes,
} from '../actions';


@Injectable()
export class AccountEffects {
  constructor(
    private actions: Actions,
    private accountService: AccountService,
  ) {}
  
  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType(AccountActionTypes.LOGIN),
    map((action: Login) => action.payload),
    switchMap((payload) => {
      return this.accountService.login(payload).pipe(
        map(response => new LoginSuccess(response)),
        catchError((errorResponse: any) => of(new LoginFailure(errorResponse.error))),
      );
    }),
  );

  @Effect({dispatch: false})
  Logout: Observable<any> = this.actions.pipe(
    ofType(AccountActionTypes.LOGOUT),
    map(() => {
      this.accountService.logout();
    }),
  );
}