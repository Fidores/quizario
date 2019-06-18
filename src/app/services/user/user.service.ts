import { User } from './../../models/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  user$ = new Subject<User | {}>();

  signUp(user: User) {
    return this.http.post(`${ environment.apiOrigin }/users`, user, { observe: 'response', headers: { 'Access-Control-Expose-Headers': 'x-auth-token' } })
      .pipe(map((response: HttpResponse<User>) => {
        localStorage.setItem('auth-token', response.headers.get('x-auth-token'));
        this.user$.next(response.body);
        return response.body;
      }));
  }

  logOut() {
    localStorage.removeItem('auth-token');
    this.user$.next({});
  }
}
