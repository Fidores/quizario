import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { isOffscreen } from 'src/app/helpers/isOffscreen';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  constructor(
    private readonly hostRef: ElementRef,
    private readonly overlay: OverlayService,
    private readonly renderer: Renderer2
  ) { }

  tooltipRef: HTMLElement;
  host: HTMLElement = this.hostRef.nativeElement;

  @Input('tooltip') text: string;
  @Input('position') position: string;
  @Input('margin') margin: number = 10;

  @HostListener('mouseenter') show() {
    this.tooltipRef = this.overlay.appendElement(this.createTooltip());
    this.setPositions();
  }

  @HostListener('mouseleave') onmouseleave() { this.hide() };
  
  @HostListener('click') onclick() { this.hide() };

  hide(): void { this.overlay.deleteElement(this.tooltipRef); }

  private createTooltip(): HTMLSpanElement {
    const tooltip = this.renderer.createElement('span');
    tooltip.textContent = String(this.text);
    tooltip.classList.add('tooltip');

    return tooltip;
  }

  private setPositions(): void {
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
