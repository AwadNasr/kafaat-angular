import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText: string;
  private tooltipElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }
  ngOnDestroy() {
    this.hideTooltip(); // Clean up tooltip when the directive is destroyed
  }

  private showTooltip() {
    if (!this.tooltipElement) {
      this.createTooltipElement();
    }

    this.renderer.appendChild(document.body, this.tooltipElement);
    const { top, left } = this.el.nativeElement.getBoundingClientRect();
    const positionX = left + window.scrollX;
    const positionY = top + window.scrollY;
    console.log(`top : ${top} , left : ${left}`)

    this.renderer.setStyle(this.tooltipElement, 'top', `${positionY - 40}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left - 20}px`);
  }

  private hideTooltip() {
    if (this.tooltipElement && this.tooltipElement.parentNode) {
      this.tooltipElement.parentNode.removeChild(this.tooltipElement);
    }
  }

  private createTooltipElement() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'customTooltip');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));
  }
}