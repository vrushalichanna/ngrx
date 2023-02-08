import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/app-state/appState.interface';
import { Appstate } from 'src/app/store/appstate';
import { PostInterface } from '../types/post.interface';
import * as PostActions from '../store/actions';
import { setAPIStatus } from 'src/app/store/app.action';
import { selectAppState } from 'src/app/store/app.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { selectPostById } from '../store/selectors';


@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.scss']
})
export class EditPostsComponent implements OnInit {
  postTitle:string =  '';
  postId = 1;
  postsData: PostInterface = {
    id: 12,
    title: ''
  };
  constructor( private store: Store<AppStateInterface>,
    private appStore: Store<Appstate>,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectPostById(id)));
      })
    );
    console.log(fetchData$)
    fetchData$.subscribe((data) => {
      if (data) {
        this.postsData = { ...data };
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    // this.postsData = { id: this.postId, title: this.postTitle}
    console.log(this.postsData)
    this.store.dispatch(PostActions.invokeUpdatePostAPI({payload : this.postsData}));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
}
