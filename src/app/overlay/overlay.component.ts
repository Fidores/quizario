import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { OverlayService } from '../services/overlay/overlay.service';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  constructor(
    private Overlay: OverlayService,
    private renderer: Renderer2,
    private hostEl: ElementRef
  ) { }

  ngOnInit() {
    this.Overlay.addElListener.subscribe(el => this.renderer.appendChild(this.hostEl.nativeElement, el));
    this.Overlay.deleteElListener.subscribe(el => this.renderer.removeChild(this.hostEl.nativeElement, el));
  }

}
