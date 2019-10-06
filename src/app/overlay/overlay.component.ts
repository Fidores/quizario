import { FullScreenOptions } from './../models/overlay';
import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { OverlayService } from '../services/overlay/overlay.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from '../animations/fadeIn';
import { fadeOut } from '../animations/fadeOut';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('fullscreen', [
      transition(':enter', useAnimation(fadeIn, { params: { duration: '.2s' } })),
      transition(':leave', useAnimation(fadeOut, { params: { duration: '.2s' } }))
    ])

  ]
})
export class OverlayComponent implements OnInit {

  constructor(
    private overlay: OverlayService,
    private renderer: Renderer2,
    private hostEl: ElementRef
  ) { }

  @ViewChild('fullScreenContainer', { static: false }) container: ElementRef<HTMLElement>;
  fullScreenConfig: FullScreenOptions = {
    isOpened: false,
    isTransparent: false
  };

  ngOnInit() {
    this.overlay.addElementEmitter.subscribe(el => this.renderer.appendChild(this.hostEl.nativeElement, el));
    this.overlay.deleteElementEmitter.subscribe(el => this.renderer.removeChild(this.hostEl.nativeElement, el));
    this.overlay.fullScreenEmitter.subscribe(config => this.fullScreenConfig = config);
  }

  notifyClick() {
    this.overlay.emitClickOnFullScreen();
  }

}
