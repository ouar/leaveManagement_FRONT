import { EditPostDetailComponent } from './detailPost/component/edit-post-detail/edit-post-detail.component';
import { AddPostDetailComponent } from './detailPost/component/add-post-detail/add-post-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './component/add-post/add-post.component';
import { EditPostComponent } from './component/edit-post/edit-post.component';
import { ListPostComponent } from './component/list-post/list-post.component';
export const postRouteList: Routes = [
  {
    path: '',
    component: ListPostComponent
  },
  {
    path: 'add',
    component: AddPostComponent
  },
  {
    path: 'edit/:postSlug',
    component: EditPostComponent
  },
  {
    path: ':postSlug/add-post-detail/:postSlug',
    component: AddPostDetailComponent
  },
  {
    path: ':postSlug/edit-post-detail/:postDetailId',
    component: EditPostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(postRouteList)],
  exports: [RouterModule]
})
export class PostRouter {}
