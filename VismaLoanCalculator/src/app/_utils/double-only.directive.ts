import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[DoubleOnly]'
})
export class StrictDecimalOnlyDirective {

  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);  //Decimal Number
  private specialKeys: Array<string> = ['Backspace', 'ArrowLeft', 'ArrowRight'];
  constructor(private elementRef: ElementRef) { }

  /**
   * Keyboard action inputs
   * @param event 
   */
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const inputValue: string = this.elementRef.nativeElement.value.concat(event.key);
    if (event.key === "Enter") {
      if (Number(this.elementRef.nativeElement.value) > 70001) {
        event.preventDefault();

        this.elementRef.nativeElement.value = Number(70001);
      }
    }
    console.log(event.key);
    if (inputValue && !String(inputValue).match(this.regex)) {

      event.preventDefault();
    }

    return;
  }

  /**
   * Copy Paste action in case the user wants to input text from clipboard
   * @param event 
   */
  @HostListener('paste', ['$event']) onPaste(event: any) {
    const clipboardData = (event.originalEvent || event).clipboardData.getData('text/plain');
    if (clipboardData) {
      const regEx = new RegExp('^[0-9]*$');
      if (!regEx.test(clipboardData)) {
        event.preventDefault();
      }
    }
    return;
  }
}