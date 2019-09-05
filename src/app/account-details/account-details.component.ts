import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { take } from 'rxjs/operators';
import { faPen, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  constructor( private readonly user: UserService ) { }

  userDetails: User;
  faPen = faPen;
  faSave = faSave;
  editMode = true;

  updateForm = new FormGroup({
    name: new FormControl('', [ Validators.minLength(3), Validators.maxLength(128), Validators.required ]),
    surname: new FormControl('', [ Validators.minLength(3), Validators.maxLength(128), Validators.required ]),
    email: new FormControl('', [ Validators.maxLength(128), Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.minLength(5), Validators.maxLength(255) ])
  });

  ngOnInit() {
    this.user.getUser().pipe(take(1)).subscribe(user => { this.userDetails = user; this.updateForm.patchValue(user) });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  updateUser() {
    this.user.updateUser(this.updateForm.value).subscribe(user => this.editMode = false);
  }

  // Getters for form

  get name() {
    return this.updateForm.get('name');
  }

  get surname() {
    return this.updateForm.get('surname');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get password() {
    return this.updateForm.get('password');
  }

}
