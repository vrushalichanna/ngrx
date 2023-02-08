import { createReducer, on } from "@ngrx/store";
import { PostsStateInterface } from "../types/postState.interface";
import * as PostAction from './actions';

export const initialState: PostsStateInterface = {
    isLoading: false,
    posts: [],
    error: ''
};

export const reducers = createReducer(
    initialState,
    on(PostAction.getPosts, (state) => ({ ...state, isLoading: true})),
    on(PostAction.getPostsSuccess, (state, action) => ({ 
        ...state,
        isLoading: false,
        posts:action.posts
    })),
    on(PostAction.getPostsFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
    })),
    on(PostAction.addPosts,(state,action) => (
         {
        ...state,
        posts: [...state.posts, action.payload]}
    )),
    on(PostAction.deletePostAPISuccess, (state, action) => {
        let newState = state.posts.filter((data) => data.id != action.id);
        return { ...state, posts: newState};
      }),
    on(PostAction.UpdatePostAPISuccess, (state,action) => {
        let newState = state.posts.filter((data) => data.id != action.payload.id);
        // newState.unshift(action.payload);
        return { ...state, posts: newState};
    })
);