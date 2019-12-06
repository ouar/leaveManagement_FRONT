import { CreateCollaborateurComponent } from './component/collabs/create-collaborateur/create-collaborateur.component';
import { UsersListComponent } from './component/users/users-list/users-list.component';
import { ListeCollaborateurComponent } from './component/collabs/liste-collaborateur/liste-collaborateur.component';

import { AdminGuard } from './shared/security/guard/admin-guard';
import { CongesComponent } from './component/conges/conges.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './shared/security/guard/auth-guard';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'leaves', component: CongesComponent, canActivate: [AuthGuard] },
  { path: 'contributors', component: ListeCollaborateurComponent, canActivate: [AdminGuard] },
  { path: 'add-contributor', component: CreateCollaborateurComponent, canActivate: [AdminGuard] },
  { path: 'users', component: UsersListComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
