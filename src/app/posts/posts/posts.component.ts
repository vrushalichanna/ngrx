import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/app-state/appState.interface';
import { PostInterface } from 'src/app/posts/types/post.interface';
import { setAPIStatus } from 'src/app/store/app.action';
import { selectAppState } from 'src/app/store/app.selector';
import { Appstate } from 'src/app/store/appstate';
import { PostsService } from '../services/posts.service';
import * as PostActions from '../store/actions';
import { errorSelector, isLoadingSelector, postsSelector } from '../store/selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  posts$: Observable<PostInterface[]>;
  postTitle:string =  '';
  postId = 1;
  payload: PostInterface = {
    id: 12,
    title: ''
  };

  displayStyle: any;

  constructor(
    private store: Store<AppStateInterface>,
    private appStore: Store<Appstate>,
    private postService: PostsService) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.posts$ = this.store.pipe(select(postsSelector))
   }

  ngOnInit(): void {

    this.store.dispatch(PostActions.getPosts());
  }

  deletePost(id:number) {
    console.log(id)
    this.store.dispatch(PostActions.invokeDeletePostAPI({id}));
    let apiStatus$ = this.store.pipe(select(selectAppState));
    apiStatus$.subscribe((appState) => {
      if(appState.apiStatus === 'success') {
        this.store.dispatch(setAPIStatus({apiStatus: { apiResponseMessage: '', apiStatus: ''}}))
      }
    })
  }
}
