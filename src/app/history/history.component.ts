import { map } from 'rxjs/operators';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(
    private readonly user: UserService
  ) { }

  history$: Observable<any>;

  ngOnInit() {
    this.history$ = this.user.getUser().pipe(map(user => user.gamesHistory));
  }

}
