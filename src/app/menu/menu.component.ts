import { Component, OnInit, Input, AfterViewChecked, ElementRef, HostListener } from '@angular/core';
import { zoomIn, zoomOut } from 'ng-animate';
import { trigger, transition } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('menu', [ 
      transition('void => *', zoomIn, { params: { timing: 0.2 } }), 
      transition('* => void', zoomOut, { params: { timing: 0.2 } }) 
    ]),
  ]
})
export class MenuComponent implements OnInit, AfterViewChecked {

  constructor(
    private readonly host: ElementRef<HTMLElement>
  ) { }

  @Input('triggerButton') triggerButton: HTMLElement;
  @HostListener('document:click', ['$event']) onOutsideClick($event) {
    
  }

  isVisible = false;
  hostPositions: DOMRect | ClientRect;

  ngOnInit() {
    this.triggerButton.addEventListener('click', this.toggleVisibility.bind(this));
  }

  ngAfterViewChecked() {
    if(this.isVisible) this.setPosition();
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  private setPosition() {
    this.hostPositions = this.host.nativeElement.getBoundingClientRect();
    const btn = this.triggerButton.getBoundingClientRect();
    this.host.nativeElement.style.setProperty('top', `${ btn.top }px`);
    this.host.nativeElement.style.setProperty('left', `${ btn.left - this.hostPositions.width - 20 }px`);
  }

}
