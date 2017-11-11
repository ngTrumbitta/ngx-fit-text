import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ExampleComponent } from './example.component';
import { NgxFitTextModule } from '../index';

@NgModule({
  declarations: [ExampleComponent],
  imports: [BrowserModule, NgxFitTextModule],
  providers: [],
  bootstrap: [ExampleComponent]
})
export class ExampleModule {}
