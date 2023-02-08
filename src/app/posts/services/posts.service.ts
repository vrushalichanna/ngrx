import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PostInterface } from '../types/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<PostInterface[]> {
      return this.httpClient.get<PostInterface[]>('http://localhost:3000/posts').pipe(delay(2000));
  }

  savePosts(payload: PostInterface) {
    return this.httpClient.post<PostInterface>('http://localhost:3000/posts', payload);
  }

  deletePost(id: number) {
    return this.httpClient.delete(`http://localhost:3000/posts/${id}`);
  }

  updatePost(payload:PostInterface) {
    return this.httpClient.put(`http://localhost:3000/posts/${payload.id}`,payload);
  }

}
