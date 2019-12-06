import { Subscription } from 'rxjs';

import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../../shared/security/models/user';
import { AuthenticationService } from '../../shared/security/services/authentication-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;
  currentUser: User;
  private authentication$: Subscription;
  private router$: Subscription;

  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.router$ = this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
    this.authentication$ = this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }
  isAuthentificated(): boolean {
    return this.currentUser ? true : false;
  }
  isAdmin(): boolean {
    return this.currentUser &&
      this.currentUser.roles.find(role => role.roleCode === 'ADMIN')
      ? true
      : false;
  }
  ngOnDestroy(): void {
    if (this.authentication$) {
      this.authentication$.unsubscribe();
    }
    if (this.router$) {
      this.router$.unsubscribe();
    }
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }
}
