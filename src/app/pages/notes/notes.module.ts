import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';
import { BackButtonModule } from '@components/shared/back-button/back-button.module';
import { SharedDirectivesModule } from '@directives/shared-directives.module';
import { SearchbarModule } from '@components/shared/searchbar/searchbar.module';
import { SharedPipesModule } from '@pipes/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesPageRoutingModule,
    BackButtonModule,
    SharedDirectivesModule,
    SearchbarModule,
    SharedPipesModule,
  ],
  declarations: [NotesPage],
})
export class NotesPageModule {}
