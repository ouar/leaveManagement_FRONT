import { User } from './../models/user';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthenticationService } from './../services/authentication-service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  private currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUser = this.authenticationService.currentUserValue;

    if (
      this.currentUser &&
      this.currentUser.roles.find(role => role.roleCode === 'ADMIN')
    ) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
