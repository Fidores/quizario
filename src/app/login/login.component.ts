import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  ngOnInit() {
  }

  logInUser(form: NgForm){
    this.auth.logIn(form.value.email, form.value.password).subscribe(token => this.router.navigate(['/']));
  }

}
