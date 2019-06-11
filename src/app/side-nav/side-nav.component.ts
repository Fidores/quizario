import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';
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
    private readonly Overlay: OverlayService
  ) { }

  faHome = faHome;
  faBars = faBars;

  @HostBinding('class') status: string = '';

  ngOnInit() {
    this.sideNav.closeListeaner.subscribe(className => this.status = className as string);
    this.sideNav.openListeaner.subscribe(className => this.status = className as string);
  }

  close() {
    this.status = 'closed';
    this.Overlay.fullScreen(false);
  }

  open() {
    this.status = 'opened';
  }

}
