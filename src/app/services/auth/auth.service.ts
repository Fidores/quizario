import { UserService } from './../user/user.service';
import { User } from './../../models/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly user: UserService
  ) { }

  logIn(email: string, password: string) {
    return this.http.post<User>(environment.apiOrigin + '/auth', { password, email }, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' as 'json',
      observe: 'response'
    }).pipe(map(res => { 
      localStorage.setItem('auth-token', res.headers.get('x-auth-token')); 
      this.user.user$.next(res.body);
      return res.body;
    }));
  }

  isAuthorized(): boolean {
    return localStorage.getItem('auth-token') ? true : false;
  }

}
