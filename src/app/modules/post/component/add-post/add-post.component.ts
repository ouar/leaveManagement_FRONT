import { Post } from './../../model/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post-service';
import { PostDetail } from '../../model/post-detail';
import * as Editor from 'src/app/modules/post/custome/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, OnDestroy {
  public editor = Editor;
  createPost: FormGroup;
  private httpAddPost$: Subscription;
  private httpFindlistPosts$: Subscription;
  private listPosts$: Subscription;
  protected listPosts: Array<Post> = [];

  constructor(private postService: PostService) {
    this.listPosts$ = this.postService.ArraylistPosts.subscribe(state => {
      this.listPosts = state;
    });
  }

  ngOnInit() {
    this.createPost = new FormGroup({
      titlePost: new FormControl(null, Validators.required),
      bodyPost: new FormControl(null, Validators.required),
      titleDetailPost: new FormControl(null, Validators.required),
      bodyDetailPost: new FormControl(null, Validators.required)
    });

    this.init();

    if (this.listPosts.length === 0) {
      this.findPosts();
    }
  }
  // convenience getter for easy access to form fields
  get formulaire() {
    return this.createPost.controls;
  }
  addPost() {
    const post = new Post();
    const postDetail = new PostDetail();
    const listPostDetailsDto = new Array<PostDetail>();
    post.title = this.formulaire.titlePost.value;
    post.slug = this.formulaire.titlePost.value;
    post.body = this.formulaire.bodyPost.value;
    postDetail.body = this.formulaire.bodyDetailPost.value;
    postDetail.title = this.formulaire.titleDetailPost.value;
    listPostDetailsDto.push(postDetail);
    post.postDetails = listPostDetailsDto;
    this.httpAddPost$ = this.postService.addPost(post).subscribe(
      listposts => {
        this.listPosts = listposts;
        this.postService.initListPosts(listposts);
      },
      error => {
        // this.congesService.clearListConges();
      }
    );
  }
  ngOnDestroy(): void {
    if (this.httpAddPost$) {
      this.httpAddPost$.unsubscribe();
    }
    if (this.listPosts$) {
      this.listPosts$.unsubscribe();
    }
    if (this.httpFindlistPosts$) {
      this.httpFindlistPosts$.unsubscribe();
    }
  }
  public onChange({ editor }: ChangeEvent) {
    if (editor && editor.getData()) {
      this.formulaire.bodyDetailPost.setValue(editor.getData());
    }
  }
  init(): void {
    this.formulaire.titlePost.valueChanges.subscribe(newTitlePost => {
      const alreadyExist = this.listPosts.find(
        post => post.slug.toUpperCase() === newTitlePost.trim().toUpperCase()
      );
      if (alreadyExist) {
        console.log(alreadyExist);
      }
    });
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
}
