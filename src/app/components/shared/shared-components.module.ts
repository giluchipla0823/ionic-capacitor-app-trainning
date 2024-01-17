import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyResultsComponent } from './empty-results/empty-results.component';
import { IonicModule } from '@ionic/angular';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';

const SHARED_COMPONENTS = [
  EmptyResultsComponent,
  ShowHidePasswordComponent,
  ErrorMessagesComponent,
];

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_COMPONENTS],
})
export class SharedComponentsModule {}
