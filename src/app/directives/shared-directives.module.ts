import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';

const SHARED_DIRECTIVES = [HighlightDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...SHARED_DIRECTIVES],
  exports: [...SHARED_DIRECTIVES],
})
export class SharedDirectivesModule {}
