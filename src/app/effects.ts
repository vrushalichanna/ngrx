import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, of, map, mergeMap, switchMap } from "rxjs";
import { AppStateInterface } from "src/app/app-state/appState.interface";
import { setAPIStatus } from "src/app/store/app.action";
import { PostsService } from "../services/posts.service";
import { PostInterface } from "../types/post.interface";
import * as PostActions from './actions';
@Injectable()
export class PostsEffects{
     getPost$ = createEffect(() =>
     this.actions$.pipe(
        ofType(PostActions.getPosts),
        mergeMap(() => {
        return this.postService.getPosts().pipe(
            map((posts) => PostActions.getPostsSuccess({ posts })),
            catchError((error) => 
                of(PostActions.getPostsFailure({ error: error.message}))
         )
        );
     })
    )
 );

savePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.addPosts),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.postService.savePosts(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return PostActions.saveNewPostAPISucess({ newPost: data });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(PostActions.invokeDeletePostAPI),
        switchMap((action) => {
            this.appStore.dispatch(
                setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: ''} })
            );
            return this.postService.deletePost(action.id).pipe(
                map((data) => {
                    this.appStore.dispatch(
                        setAPIStatus({
                            apiStatus: { apiResponseMessage: '', apiStatus: 'success'},
                        })
                    );
                    return PostActions.deletePostAPISuccess({ id: action.id });
                })
            )
        })
    )
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(PostActions.invokeUpdatePostAPI),
        switchMap((action) => {
            this.store.dispatch(
                setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}})
            );
            return this.postService.updatePost(action.payload).pipe(
                map((data) => {
                    this.appStore.dispatch(
                        setAPIStatus({
                            apiStatus: { apiResponseMessage: '', apiStatus: ''},
                        })
                    );
                    return PostActions.UpdatePostAPISuccess({payload : action.payload});
                })
            )
        })
    )
  });



     constructor(private actions$: Actions,
                private postService: PostsService,
                private store: Store,
                private appStore: Store<AppStateInterface>) {}
}