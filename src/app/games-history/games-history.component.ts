import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { gamesHistory } from '../models/user';

@Component({
  selector: 'app-games-history',
  templateUrl: './games-history.component.html',
  styleUrls: ['./games-history.component.scss']
})
export class GamesHistoryComponent implements OnInit {

  constructor(
    private readonly user: UserService
  ) { }

  history$: Observable<gamesHistory[]>;

  ngOnInit() {
    this.history$ = this.user.getHistory();
  }

}
