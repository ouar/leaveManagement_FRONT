import { PostRouter } from './post-router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from './services/post-service';
import { AddPostComponent } from './component/add-post/add-post.component';
import { EditPostComponent } from './component/edit-post/edit-post.component';
import { ListPostComponent } from './component/list-post/list-post.component';
import { EditPostDetailComponent } from './detailPost/component/edit-post-detail/edit-post-detail.component';
import { AddPostDetailComponent } from './detailPost/component/add-post-detail/add-post-detail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [CommonModule, PostRouter, FormsModule, ReactiveFormsModule, CKEditorModule],
  declarations: [ListPostComponent, AddPostComponent, EditPostComponent, ListPostComponent, EditPostDetailComponent, AddPostDetailComponent]
})
export class PostModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PostModule,
      providers: [PostService]
    };
  }
}
