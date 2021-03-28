import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[repeats]',
})
export class RepeatsDirective {
  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  @Input() set repeats(loops: number) {
    for (let index = 0; index < loops; ++index) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
