import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../app-state/appState.interface";
import { PostInterface } from "../types/post.interface";

export const selectFeature = (state: AppStateInterface) => state.posts;
export const selectPosts = createFeatureSelector<PostInterface[]>('Posts');

export const isLoadingSelector = createSelector(
    selectFeature,
    (state) => state.isLoading
);

export const postsSelector = createSelector(
    selectFeature,
    (state) => state.posts
);

export const errorSelector = createSelector(
    selectFeature,
    (state) => state.error
);

export const selectPostById = (postId: number) =>
  createSelector(postsSelector, (posts: PostInterface[]) => {
    console.log(selectPosts)
    var postById = posts.filter((_) => _.id == postId);
    if (postById.length == 0) {
      return null;
    }
    return postById[0];
  });
