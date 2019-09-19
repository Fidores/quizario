import { User, UserPayload } from './../../models/user';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  user$ = new BehaviorSubject<User | null>(null);

  signUp(user: UserPayload) {
    return this.http.post<User>(`${ environment.api }/users`, user, { observe: 'response'})
      .pipe(map(res => this.saveUserLocally(res)));
  }

  logOut() {
    localStorage.removeItem('auth-token');
    this.user$.next(null);
  }

  getUser() {
    return this.http.get<User>(`${environment.api}/users/me`);
  }

  updateUser(user: UserPayload) {
    return this.http.put<User>(`${ environment.api }/users`, user);
  }

  /**
   * Notifies app if the user is already logged in.
  */

  notify(): void {
    const token = localStorage.getItem('auth-token');
    if(!token) return null;

    this.http.get<User>(environment.api + '/users/me')
      .subscribe(user => this.user$.next(user), (err: HttpErrorResponse) => this.user$.next(null));
  }

  /**
   * Saves auth token to local storage. 
  */

  saveUserLocally(response: HttpResponse<User>) {
    localStorage.setItem('auth-token', response.headers.get('x-auth-token'));
    this.user$.next(response.body);
    return response.body;
  }

  /**
   * Bookmarks quiz
  */

  bookmark(id: string) {
    return this.http.post(`${environment.api}/users/bookmarks`, { id });
  }

  /**
   * Gets bookmarked quizzes
  */

  getBookmarks() {
    return this.http.get(`${environment.api}/users/bookmarks`);
  }

  isAuthorized(): boolean {
    return localStorage.getItem('auth-token') ? true : false;
  }
}
