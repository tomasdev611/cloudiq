import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from 'src/app/services';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    if (user) {
      return true;
    }

    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
