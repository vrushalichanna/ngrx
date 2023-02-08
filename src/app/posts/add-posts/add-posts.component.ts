import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PostInterface } from '../types/post.interface';
import * as PostActions from '../store/actions';
import { Appstate } from 'src/app/store/appstate';
import { selectAppState } from 'src/app/store/app.selector';
import { setAPIStatus } from 'src/app/store/app.action';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss']
})
export class AddPostsComponent implements OnInit {
  postTitle = '';
  postObj: PostInterface = {
    id: 12,
    title: ''
  };
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router) { }

  ngOnInit(): void {
  }

  addPost() {
    console.log(this.postTitle)
    let postId =  Math.floor((Math.random() * 100) + 1);
    this.postObj = { id: postId, title: this.postTitle}
    this.store.dispatch(PostActions.addPosts({payload:this.postObj}));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((apState) => {
        if (apState.apiStatus == 'success') {
          this.appStore.dispatch(
            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
          );
        }
      });
      this.router.navigate(['/']);
    }

}


