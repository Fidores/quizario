import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
    private Overlay: OverlayService,
    private renderer: Renderer2,
    private hostEl: ElementRef
  ) { }

  @ViewChild('fullScreenContainer') container: ElementRef<HTMLElement>;
  fullScreen: boolean = false;

  ngOnInit() {
    this.Overlay.addElListener.subscribe(el => this.renderer.appendChild(this.hostEl.nativeElement, el));
    this.Overlay.deleteElListener.subscribe(el => this.renderer.removeChild(this.hostEl.nativeElement, el));
    this.Overlay.fullScreenListener.subscribe(open => this.fullScreen = open as boolean);
  }

  notifyClick() {
    this.Overlay.clickedOnFullScreen();
  }

}
