import { MatchPasswordsValidator } from './../common/validators/matchPasswords';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private readonly user: UserService
  ) { }

  ngOnInit() {
  }

  signUpForm = new FormGroup({
    name: new FormControl('AAAAAAAAA', [ Validators.minLength(3), Validators.maxLength(128), Validators.required ]),
    surname: new FormControl('AAAAAAAAA', [ Validators.minLength(3), Validators.maxLength(128), Validators.required ]),
    email: new FormControl('A@A.pl', [ Validators.email, Validators.maxLength(128), Validators.required ]),
    password: new FormControl('1234567', [ Validators.minLength(5), Validators.maxLength(255), Validators.required ]),
    confirmPassword: new FormControl('1234567', [ Validators.minLength(5), Validators.maxLength(255), Validators.required ])
  }, MatchPasswordsValidator);

  signUp(){
    console.log(this.signUpForm)
    // this.user.signUp(form.value).subscribe(console.log);
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get email() {
    return this.signUpForm.get('password');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get surname() {
    return this.signUpForm.get('surname');
  }

}
