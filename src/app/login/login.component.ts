import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs/operators';
import { of, empty } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  logIn = {
    email: 'albert7773000@gmail.com',
    password: '123456'
  };
  error: HttpErrorResponse;

  ngOnInit() {
  }

  logInUser(form: NgForm) {
    this.error = null;

    this.auth.logIn(form.value.email, form.value.password)
    .pipe(catchError((err: HttpErrorResponse) => {
      this.error = err;
      return of(empty);
    }), take(1))
    .subscribe(token => {
      if (!this.error) { this.router.navigate(['/']); }
    });
  }

}
