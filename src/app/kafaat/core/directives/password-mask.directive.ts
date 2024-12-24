import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[passwordMask]'
})
export class PasswordMaskDirective {
  @Output() originalValue = new EventEmitter<string>();

  private originalText: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput() {
    const value = this.el.nativeElement.value;
    const maskedValue = value.replace(/./g, 'x');
    this.el.nativeElement.value = maskedValue;

    if (value.length >= this.originalText.length) {
      this.originalText += value.substring(this.originalText.length);
      this.originalValue.emit(this.originalText);
    } else {
      const diffCount = this.originalText.length - value.length;
      this.originalText = this.originalText.substring(0, this.originalText.length - diffCount);
      this.originalValue.emit(this.originalText);
    }
  }


}
