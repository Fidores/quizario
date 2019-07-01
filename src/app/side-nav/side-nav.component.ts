import { Component, OnInit, HostBinding } from '@angular/core';
import { faHome, faBars, faSave, faHistory } from '@fortawesome/free-solid-svg-icons';
import { SideNavService } from '../services/side-nav/side-nav.service';
import { OverlayService } from '../services/overlay/overlay.service';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(
    private readonly sideNav: SideNavService,
    private readonly overlay: OverlayService
  ) { }

  faHome = faHome;
  faBars = faBars;
  faSave = faSave;
  faHistory = faHistory;

  @HostBinding('class') status = '';

  ngOnInit() {
    this.sideNav.closeListeaner.subscribe(className => this.status = className as string);
    this.sideNav.openListeaner.subscribe(className => this.status = className as string);
    this.overlay.fullScreenClickListener.subscribe(click => this.close());
  }

  close() {
    this.status = 'closed';
    this.overlay.fullScreen(false);
  }

  open() {
    this.status = 'opened';
    this.overlay.fullScreen(true);
  }

}
