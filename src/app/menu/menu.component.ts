import { Subscription } from 'rxjs';
import { Component, OnInit, Input, AfterViewChecked, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { zoomIn, zoomOut } from 'ng-animate';
import { trigger, transition } from '@angular/animations';
import { OverlayService } from '../services/overlay/overlay.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('menu', [ 
      transition('void => *', zoomIn, { params: { timing: 0.2 } }), 
      transition('* => void', zoomOut, { params: { timing: 0.2 } }) 
    ])
  ]
})
export class MenuComponent implements OnInit, AfterViewChecked, OnDestroy {

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly overlay: OverlayService
  ) { }

  @Input('triggerButton') triggerButton: HTMLElement;
  @HostListener('click') onclick() { this.close() }
  
  isVisible = false;
  hostPositions: DOMRect | ClientRect;
  overlaySubscription: Subscription;
  menuRef: HTMLElement;

  ngOnInit() {
    this.triggerButton.addEventListener('click', this.toggleVisibility.bind(this));
    this.menuRef = this.overlay.appendElement(this.host.nativeElement);
  }

  ngOnDestroy() {
    this.overlay.deleteElement(this.menuRef);
  }

  ngAfterViewChecked() {
    if(this.isVisible) this.setPosition();
  }

  toggleVisibility() {
    this.isVisible ? this.close() : this.open();
  }

  private open() {
    this.isVisible = true;
    this.overlay.openFullScreen(true);
    this.overlaySubscription = this.overlay.fullScreenClickEmitter.subscribe(click => this.close());
  }

  private close() {
    this.isVisible = false;
    this.overlay.closeFullScreen();
    this.overlaySubscription.unsubscribe();
  }

  private setPosition() {
    this.hostPositions = this.host.nativeElement.getBoundingClientRect();
    const btn = this.triggerButton.getBoundingClientRect();
    this.host.nativeElement.style.setProperty('top', `${ btn.top }px`);
    this.host.nativeElement.style.setProperty('left', `${ btn.left - this.hostPositions.width - 20 }px`);
  }

}
