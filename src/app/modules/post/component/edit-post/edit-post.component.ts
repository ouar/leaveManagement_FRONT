import { Post } from './../../model/post';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post-service';
import { Params, ActivatedRoute } from '@angular/router';
import { PreviousRouteService } from '../../services/previous-route.service';
import { PostDetail } from '../../model/post-detail';
import * as Editor from 'src/app/modules/post/custome/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  public editor = Editor;
  protected editPost: Post;
  editPostGroup: FormGroup;
  private httpEditPost$: Subscription;
  private httpUpdatePost$: Subscription;
  httpFindlistPosts$: Subscription;
  private listPosts$: Subscription;
  private route$: Subscription;
  protected listPosts: Array<Post> = [];
  protected path: string;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private previousRouteService: PreviousRouteService
  ) {
    this.listPosts$ = this.postService.ArraylistPosts.subscribe(state => {
      this.listPosts = state;
    });
    // assign the subscription to a variable so we can unsubscribe to prevent memory leaks
    this.route$ = this.activatedRoute.paramMap.subscribe((paramMap: Params) => {
      this.editPost = this.listPosts.find(
        post => post.slug === paramMap.params.postSlug
      );
    });
    this.path = this.previousRouteService.getPreviousUrl();
  }

  ngOnInit() {
    if (this.listPosts.length === 0) {
      this.findPosts();
    }
    this.editPostGroup = new FormGroup({
      idPost: new FormControl(this.editPost.id, Validators.required),
      titleDetailPost: new FormControl(null, Validators.required),
      bodyDetailPost: new FormControl(null, Validators.required)
    });
  }
  // convenience getter for easy access to form fields
  get formulaire() {
    return this.editPostGroup.controls;
  }

  ngOnDestroy(): void {
    if (this.httpEditPost$) {
      this.httpEditPost$.unsubscribe();
    }
    if (this.listPosts$) {
      this.listPosts$.unsubscribe();
    }
    if (this.route$) {
      this.route$.unsubscribe();
    }
    if (this.httpUpdatePost$) {
      this.httpUpdatePost$.unsubscribe();
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
  public onChange({ editor }: ChangeEvent) {
    if (editor && editor.getData()) {
      this.formulaire.bodyDetailPost.setValue(editor.getData());
    }
  }

  updatePost() {
    const post = new Post();
    const postDetail = new PostDetail();
    const listPostDetailsDto = new Array<PostDetail>();
    post.id = this.formulaire.idPost.value;
    postDetail.body = this.formulaire.bodyDetailPost.value;
    postDetail.title = this.formulaire.titleDetailPost.value;
    listPostDetailsDto.push(postDetail);
    post.postDetails = listPostDetailsDto;
    this.httpUpdatePost$ = this.postService.updatePost(post).subscribe(
      listposts => {
        this.listPosts = listposts;
        this.postService.initListPosts(listposts);
      },
      error => {
        // this.congesService.clearListConges();
      }
    );
  }
}
