import { User } from './../../models/user';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
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

  user$ = new Subject<User | null>();

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
    this.user$.next(null);
  }

  getUser() {
    return this.http.get<User>(`${environment.apiOrigin}/users/me`);
  }

  /**
   * Notifies app if the user is already logged in.
  */

  notify(): void {
    const token = localStorage.getItem('auth-token');
    if(!token) return null;

    this.http.get<User>(environment.apiOrigin + '/users/me')
      .subscribe(user => this.user$.next(user), (err: HttpErrorResponse) => this.user$.next(null));
  }
}
