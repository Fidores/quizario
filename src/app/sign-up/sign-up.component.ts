import { HttpErrorResponse } from '@angular/common/http';
import { User } from './../models/user';
import { MatchPasswordsValidator } from './../common/validators/matchPasswords';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs/operators';
import { of, empty } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private readonly user: UserService,
    private readonly router: Router
  ) { }

  error: HttpErrorResponse;

  signUpForm = new FormGroup({
    name: new FormControl('AAAAAAAAA', [ Validators.minLength(3), Validators.maxLength(128), Validators.required ]),
    surname: new FormControl('AAAAAAAAA', [ Validators.minLength(3), Validators.maxLength(128), Validators.required ]),
    email: new FormControl('albert7773000@gmail.pl', [ Validators.email, Validators.maxLength(128), Validators.required ]),
    password: new FormControl('1234567', [ Validators.minLength(5), Validators.maxLength(255), Validators.required ]),
    confirmPassword: new FormControl('1234567', [ Validators.minLength(5), Validators.maxLength(255), Validators.required ])
  }, MatchPasswordsValidator);

  ngOnInit() {
  }

  signUp() {
    const { name, surname, email, password } = this.signUpForm.value;

    this.error = null;

    this.user.signUp({ name, surname, email, password } as User)
      .pipe(take(1))
      .subscribe((user: User) => { if (!this.error) { this.router.navigate(['/']); } }, (err: HttpErrorResponse) => { this.error = err; return of(empty); });
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get surname() {
    return this.signUpForm.get('surname');
  }
}
