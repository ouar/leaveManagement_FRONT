import { AdminGuard } from './shared/security/guard/admin-guard';
import { CongesComponent } from './component/conges/conges.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './shared/security/guard/auth-guard';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'conges', component: CongesComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
