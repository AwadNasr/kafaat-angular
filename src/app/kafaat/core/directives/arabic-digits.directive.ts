import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ArabicDigits]'
})
export class ArabicDigitsDirective {
  @Output() input = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const convertedValue = this.convertDigits(value);
    this.emitInput(convertedValue);
  }

  @HostListener('change', ['$event.target.value'])
  onChange(value: string) {
    const convertedValue = this.convertDigits(value);
    this.emitInput(convertedValue);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    const convertedValue = this.convertDigits(value);
    this.emitInput(convertedValue);
  }

  private convertDigits(value: string): string {
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    // Replace English digits with Arabic digits
    for (let i = 0; i < englishDigits.length; i++) {
      const regex = new RegExp(englishDigits[i], 'g');
      value = value.replace(regex, arabicDigits[i]);
    }

    return value;
  }

  private emitInput(value: string) {
    this.elementRef.nativeElement.value = value;
    this.input.emit(value);
  }
 }
