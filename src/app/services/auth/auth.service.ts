import { UserService } from './../user/user.service';
import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly user: UserService
  ) { }

  logIn(email: string, password: string): Observable<string> {
    return this.http.post<string>(environment.apiOrigin + '/auth', { password, email }, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' as 'json'
    }).pipe(map(token => { localStorage.setItem('auth-token', token) ;return token }));
  }

  logOut() {
    localStorage.removeItem('auth-token');
  }

}
