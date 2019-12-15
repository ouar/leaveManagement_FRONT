import { CreateCollaborateurComponent } from './component/collabs/create-collaborateur/create-collaborateur.component';
import { ListeCollaborateurComponent } from './component/collabs/liste-collaborateur/liste-collaborateur.component';

import { AdminGuard } from './shared/security/guard/admin-guard';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './shared/security/guard/auth-guard';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudCongeComponent } from './component/crud-conge/crud-conge.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'posts',
    loadChildren: () =>
      import('../app/modules/post/post.module').then(m => m.PostModule),
    canActivate: [AuthGuard]
  },
  { path: 'leaves', component: CrudCongeComponent, canActivate: [AdminGuard] },
  {
    path: 'contributors',
    component: ListeCollaborateurComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'add-contributor',
    component: CreateCollaborateurComponent,
    canActivate: [AdminGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
