import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model';

const apiUrl = 'http://localhost:4200';

@Injectable({
  providedIn: 'root',
})

export class AccountService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const user = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<any>(user ? JSON.parse(user) : null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(loginRequest: any) {    
    return this.http.post<User>(`${apiUrl}/login`, loginRequest)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
