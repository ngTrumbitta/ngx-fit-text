import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxFitTextDirective } from './directives/ngx-fit-text.directive';

@NgModule({
  declarations: [NgxFitTextDirective],
  exports: [NgxFitTextDirective],
  imports: [CommonModule]
})
export class NgxFitTextModule {
  static forRoot() {
    return {
      ngModule: NgxFitTextModule,
      providers: []
    };
  }
}
