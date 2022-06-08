import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';
import { ScrollToDirective } from './scroll-to.directive';

const exportedClasses = [
  ScrollToDirective,
  ClickOutsideDirective
];

@NgModule({
  declarations: exportedClasses,
  exports: exportedClasses
})
export class DirectiveModule { }
