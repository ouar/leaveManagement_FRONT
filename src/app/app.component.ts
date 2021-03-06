import { AdminGuard } from './shared/security/guard/admin-guard';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from './shared/security/models/user';
import { AuthenticationService } from './shared/security/services/authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: User;
  private authentication$: Subscription;
  collapedSideBar: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.authentication$ = this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  isAuthentificated(): boolean {
    return this.currentUser ? true : false;
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.authentication$) {
      this.authentication$.unsubscribe();
    }
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
