import { createAction, props } from '@ngrx/store';
import { PostInterface } from '../types/post.interface';

export const getPosts = createAction('[Post] Get Post');
export const getPostsSuccess = createAction('[Post] Get Post Success', props<{posts: PostInterface[]}>());
export const getPostsFailure = createAction('[Post] Get Post Failure', props<{error: string}>()); 
export const addPosts = createAction('[Post] Add Post', props<{payload: PostInterface}>());

  export const saveNewPostAPISucess = createAction(
    '[Posts API] save new Post api success',
    props<{ newPost: PostInterface }>()
  );

  export const invokeDeletePostAPI = createAction(
    '[Posts API] Inovke delete Post api',
    props<{id:number}>()
  );
  
  export const deletePostAPISuccess = createAction(
    '[Posts API] deleted Post api success',
    props<{id:number}>()
  );

  export const invokeUpdatePostAPI = createAction(
    '[Posts API] Inovke update Post api',
    props<{ payload:PostInterface}>()
  );
  
  export const UpdatePostAPISuccess = createAction(
    '[Posts API] updated Post api success',
    props<{ payload:PostInterface}>()
  );