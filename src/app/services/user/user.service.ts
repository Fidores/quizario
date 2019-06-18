import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
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

  user$ = new Subject();

  signUp(user: User) {
    return this.http.post(`${ environment.apiOrigin }/users`, { user }, { observe: 'response' });
  }
}
