import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { EditPostsComponent } from './edit-posts/edit-posts.component';
import { PostsComponent } from './posts/posts.component';


const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'add',
    component: AddPostsComponent,
  },
  {
    path: 'edit/:id',
    component: EditPostsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
