import { SearchService } from './../services/search/search.service';
import { User } from './../models/user';
import { UserService } from './../services/user/user.service';
import { SideNavService } from './../services/side-nav/side-nav.service';
import { Component, OnInit } from '@angular/core';
import { faBars, faUser, faPlusSquare, faSearch, faSignOutAlt, faSignInAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    private readonly _sideNav: SideNavService,
    private readonly _user: UserService,
    private readonly _router: Router,
    private readonly _search: SearchService
  ) { }

  faBars = faBars;
  faUser = faUser;
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faSignOut = faSignOutAlt;
  faSignIn = faSignInAlt;
  faEllipsisV = faEllipsisV;

  user: User | null;

  ngOnInit() {
    this._user.user$.subscribe(user => this.user = user);
  }

  openSideNav() {
    this._sideNav.open();
  }

  signOut() {
    this._user.logOut();
    this._router.navigate(['/']);
  }

  search(text: string) {
    this._search.searchText = text;
  }

}
