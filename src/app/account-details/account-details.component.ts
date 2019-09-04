import { FormGroup, FormControl } from '@angular/forms';
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
  editMode = false;

  updateForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit() {
    this.user.getUser().pipe(take(1)).subscribe(user => { this.userDetails = user; this.updateForm.patchValue(user) });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  updateUser() {
    this.user.updateUser(this.updateForm.value).subscribe(user => this.editMode = false);
  }

}
