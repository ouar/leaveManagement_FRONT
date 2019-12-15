import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../model/post';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  private listPosts: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  ArraylistPosts = this.listPosts.asObservable();
  private apiPostUrl = environment.apiPostUrl;
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}

  findPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiPostUrl + '/posts');
  }
  addPost(post: Post): Observable<Post[]> {
    return this.http.post<Post[]>(
      this.apiPostUrl + '/posts/',
      JSON.stringify(post),
      this.httpOptions
    );
  }
  updatePost(post: Post): Observable<Post[]> {
    return this.http.put<Post[]>(
      this.apiPostUrl + '/posts/',
      JSON.stringify(post),
      this.httpOptions
    );
  }

  initListPosts(listPosts: Array<Post>) {
    this.listPosts.next(listPosts);
  }
  clearListPosts() {
    this.listPosts.next(null);
  }
}
