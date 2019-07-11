import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  constructor( private readonly user: UserService ) { }

  userDetails: User;

  ngOnInit() {
    this.user.getUser().pipe(take(1)).subscribe(user => this.userDetails = user);
  }

}
