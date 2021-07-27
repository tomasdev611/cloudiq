import { Action } from "@ngrx/store";

export enum AccountActionTypes {
  FETCH_MY_INFO = 'FETCH_MY_INFO',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
};

export class FetchMyInfo implements Action {
  readonly type = AccountActionTypes.FETCH_MY_INFO;

  constructor() {}
}

export class Login implements Action {
  readonly type = AccountActionTypes.LOGIN;

  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = AccountActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = AccountActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AccountActionTypes.LOGOUT;

  constructor() {}
}

export type AccountActionAll =
  | FetchMyInfo
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout;