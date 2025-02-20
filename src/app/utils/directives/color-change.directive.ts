import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorChange]',
})
export class ColorChangeDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') OnMouseOver() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
  }

  @HostListener('mouseout') OnMouseOut() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
  }
}
