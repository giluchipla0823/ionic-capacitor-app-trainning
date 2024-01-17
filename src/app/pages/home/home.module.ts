import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { SharedPipesModule } from '@pipes/shared-pipes.module';
import { SearchbarModule } from '@components/shared/searchbar/searchbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    SearchbarModule,
  ],
  declarations: [HomePage, PostsComponent, PostComponent],
})
export class HomePageModule {}
