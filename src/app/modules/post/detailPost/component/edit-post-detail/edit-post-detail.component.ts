import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from './../../../services/post-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostDetail } from './../../../model/post-detail';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../../model/post';

@Component({
  selector: 'app-edit-post-detail',
  templateUrl: './edit-post-detail.component.html',
  styleUrls: ['./edit-post-detail.component.css']
})
export class EditPostDetailComponent implements OnInit, OnDestroy {
  protected editDetailPost: PostDetail;
  protected editPost: Post;
  protected editPostDetailGroup: FormGroup;
  private listPosts$: Subscription;
  private route$: Subscription;
  protected listPosts: Array<Post> = [];

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editPostDetailGroup = new FormGroup({
      titleDetailPost: new FormControl(null, Validators.required),
      bodyDetailPost: new FormControl(null, Validators.required)
    });
    this.listPosts$ = this.postService.ArraylistPosts.subscribe(state => {
      this.listPosts = state;
    });
    // assign the subscription to a variable so we can unsubscribe to prevent memory leaks
    this.route$ = this.activatedRoute.paramMap.subscribe((paramMap: Params) => {
      this.editPost = this.listPosts.find(
        post => post.slug === paramMap.params.postSlug
      );

      this.editDetailPost = this.editPost.postDetails.find(
        post => post.id.toString() === paramMap.params.postDetailId
      );
    });
  }
  // convenience getter for easy access to form fields
  get formulaire() {
    return this.editPostDetailGroup.controls;
  }

  ngOnDestroy(): void {
    if (this.listPosts$) {
      this.listPosts$.unsubscribe();
    }
    if (this.route$) {
      this.route$.unsubscribe();
    }
  }
}
