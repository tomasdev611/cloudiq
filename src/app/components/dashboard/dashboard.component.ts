import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, AccountState } from 'src/app/store/datatypes';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FetchMyInfo, Logout } from 'src/app/store/actions';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.dispatch(new FetchMyInfo());
  }

  ngOnInit(): void {
    this.store
      .select((state: AppState) => state.account)
      .pipe(untilDestroyed(this))
      .subscribe((accountState: AccountState) => {
        this.user = accountState.user;
      })
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
