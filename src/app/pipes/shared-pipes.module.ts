import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomToUrlPipe } from './random-to-url.pipe';
import { FilterDataPipe } from './filter-data.pipe';

const SHARED_PIPES = [RandomToUrlPipe, FilterDataPipe];

@NgModule({
  declarations: [...SHARED_PIPES],
  imports: [CommonModule],
  exports: [...SHARED_PIPES],
})
export class SharedPipesModule {}
