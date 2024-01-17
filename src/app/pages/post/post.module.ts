import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';
import { SharedPipesModule } from '@pipes/shared-pipes.module';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { BackButtonModule } from '@components/shared/back-button/back-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    SharedPipesModule,
    SharedComponentsModule,
    BackButtonModule,
  ],
  declarations: [PostPage],
})
export class PostPageModule {}
