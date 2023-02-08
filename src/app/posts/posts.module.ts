import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './store/effects';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditPostsComponent } from './edit-posts/edit-posts.component';
import { PostsRoutingModule } from './posts.routing';


@NgModule({
  declarations: [
    PostsComponent,
    AddPostsComponent,
    EditPostsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    StoreModule.forFeature('posts', reducers),
    EffectsModule.forFeature([PostsEffects]),
    HttpClientModule,
    PostsRoutingModule
  ],
  exports:[
    PostsComponent,
    AddPostsComponent
  ]
})
export class PostsModule { }
