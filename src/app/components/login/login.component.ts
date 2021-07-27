import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Login } from 'src/app/store/actions';
import { AppState, AccountState } from 'src/app/store/datatypes';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  errMsg = ''

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    this.store
      .select((state: AppState) => state.account)
      .pipe(untilDestroyed(this))
      .subscribe((accountState: AccountState) => {
        this.errMsg = accountState.errMsg;
        this.loading = accountState.inProgress;
        if (this.errMsg === '') {
          this.router.navigate(['/dashboard']);
        }
      })
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.loading = true;
    this.errMsg = '';
    const formValue = this.form.getRawValue();
    this.store.dispatch(new Login(formValue));
  }
}
