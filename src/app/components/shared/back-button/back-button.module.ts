import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [BackButtonComponent],
  exports: [BackButtonComponent],
})
export class BackButtonModule {}
