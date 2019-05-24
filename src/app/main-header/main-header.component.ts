import { Component, OnInit } from '@angular/core';
import { faBars, faUser, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor() { }

  faBars = faBars;
  faUser = faUser;
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;

  ngOnInit() {
  }

}
