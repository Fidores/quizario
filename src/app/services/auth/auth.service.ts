import { UserService } from './../user/user.service';
import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post<User>(environment.api + '/auth', { password, email }, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' as 'json',
      observe: 'response'
    }).pipe( map(res => this.user.saveUserLocally(res)) );
  }

}
