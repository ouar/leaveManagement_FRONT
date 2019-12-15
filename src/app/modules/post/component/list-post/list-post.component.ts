import { PostService } from './../../services/post-service';
import { Post } from './../../model/post';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crud-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {
  private httpFindlistPosts$: Subscription;
  private listPosts$: Subscription;
  protected listPosts: Array<Post> = [];
  bgarray = [
    'bg-dark'
  ];
  bgColour: any;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.listPosts$ = this.postService.ArraylistPosts.subscribe(state => {
      this.listPosts = state;
    });

    this.findPosts();

  }

  ngOnDestroy(): void {
    if (this.listPosts$) {
      this.listPosts$.unsubscribe();
    }
    if (this.httpFindlistPosts$) {
      this.httpFindlistPosts$.unsubscribe();
    }
  }

  findPosts() {
    this.httpFindlistPosts$ = this.postService.findPosts().subscribe(
      listPosts => {
        this.listPosts = listPosts;
        this.postService.initListPosts(listPosts);
      },
      error => {
        this.postService.clearListPosts();
      }
    );
  }
  getColour() {
    this.bgColour = this.bgarray[
      Math.floor(Math.random() * this.bgarray.length)
    ];
    return this.bgColour;
  }
}
