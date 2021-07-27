
export interface AccountState {
  user: any;
  inProgress: boolean;
  errMsg: string;
}

export interface AppState {
  account: AccountState;
}