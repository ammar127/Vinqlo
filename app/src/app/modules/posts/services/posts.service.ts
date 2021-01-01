import { Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postListener = new Subject<{ posts: Post[] }>();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<{ posts: any; message: string }>(`${environment.apiUrl}/posts`)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                body: post.body,
                id: post._id,
                file: post.file,
                category: post.category,
                tags: post.tags,
                createdAt: post.createdAt,
                likes: post.likes,
                creator: post.creator
              };
            }),
          };
        })
      )
      .subscribe((transformedPostData) => {
        console.log(transformedPostData);
        this.posts = transformedPostData.posts;
        this.postListener.next({
          posts: [...this.posts],
        });
      });
  }

  getPostListener() {
    return this.postListener.asObservable();
  }

  getSinglePost(post): Observable<{ post: Post; message: string }> {
    return this.http
      .get<{ message: string; post: Post }>(
        `${environment.apiUrl}/posts/` + post.id
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('body', post.body);
    postData.append('tags', post.tags);
    postData.append('creator', post.creator);
    if (!!post.file) {
      postData.append('file', post.file, post.title);
    }
    postData.append('category', post.category);
    var dataestr = new Date(post.createdAt).toUTCString();
    postData.append('createdAt', dataestr);

    this.http
      .post<{ message: string; postId }>(
        `${environment.apiUrl}/posts`,
        postData
      )
      .subscribe((responseData) => {
        const postId = responseData.postId;
        post.id = postId;
      });
  }

  deletePost(postId) {
    this.http.delete(`${environment.apiUrl}/posts/` + postId).subscribe();
  }

  updatePost(post: Post) {
    let postData: Post | FormData;
    if (typeof post.file === 'object') {
      postData = new FormData();
      var dataestr = new Date(post.createdAt).toUTCString();
      var idStrg = post.id.toString();
      postData.append('id', idStrg);
      postData.append('title', post.title);
      postData.append('body', post.body);
      postData.append('tags', post.tags);
      postData.append('file', post.file, post.title);
      postData.append('category', post.category);
      postData.append('createdAt', dataestr);
    } else {
      postData = {
        id: post.id,
        title: post.title,
        body: post.body,
        tags: post.tags,
        category: post.category,
        file: post.file,
        createdAt: post.createdAt,
        likes: post.likes,
        creator: post.creator
      };
    }
    this.http
      .put<{ message: string }>(
        `${environment.apiUrl}/posts/` + post.id,
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
}