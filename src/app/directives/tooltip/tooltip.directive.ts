import { Directive, Input, HostListener, ElementRef, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { isOffscreen } from 'src/app/helpers/isOffscreen';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit{

  constructor(
    private hostRef: ElementRef,
    private overlay: OverlayService
  ) { }

  tooltipRef: HTMLElement;
  host: HTMLElement = this.hostRef.nativeElement;

  @Input('tooltip') text: String;
  @Input('position') position: String;
  @Input('margin') margin = 10;

  ngOnInit(){ this.margin = +this.margin; }

  @HostListener('mouseenter') show(){
    this.tooltipRef = this.overlay.appendElement(this.createTooltip());
    this.setPositions();
  }

  @HostListener('mouseleave') hide(){ this.overlay.deleteElement(this.tooltipRef); }

  private createTooltip(): HTMLSpanElement{
    const tooltip = document.createElement('span');

    tooltip.textContent = String(this.text);
    tooltip.classList.add('tooltip');
    
    return tooltip;
  }

  private setPositions(): void{
    const hostPos = this.host.getBoundingClientRect();
    const tooltipPos = this.tooltipRef.getBoundingClientRect();
    const positions = { top: 0, left: 0 };

    switch (this.position) {
      case 'top':
          positions.top = hostPos.top - hostPos.height - this.margin;
          positions.left = (hostPos.left + hostPos.width / 2) - tooltipPos.width / 2;
        break;

      case 'left':
          positions.top = (hostPos.top + hostPos.height / 2) - tooltipPos.height / 2;
          positions.left = hostPos.left - tooltipPos.width - this.margin;
        break;

      case 'right':
        positions.top = (hostPos.top + hostPos.height / 2) - tooltipPos.height / 2;
        positions.left = hostPos.left + hostPos.width + this.margin;
        break;
    
      default:
        positions.top = hostPos.top + hostPos.height + this.margin;
        positions.left = (hostPos.left + hostPos.width / 2) - tooltipPos.width / 2;
        break;
    }

    this.tooltipRef.style.top = `${ positions.top }px`;
    this.tooltipRef.style.left = `${ positions.left }px`;

    isOffscreen(this.tooltipRef, { autoCorrect: true });
  }

}