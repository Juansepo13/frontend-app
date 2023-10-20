import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImageBroke]'
})
export class ImageBrokeDirective {

  constructor(private elementRef: ElementRef){ }

  ngOnInit(){
    const img = this.elementRef.nativeElement
  }

}
 