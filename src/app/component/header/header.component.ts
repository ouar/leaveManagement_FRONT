import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/security/services/authentication-service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/security/models/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public pushRightClass: string;
    currentUser: User;
    private authentication$: Subscription;
    private router$: Subscription;

    constructor(public router: Router, private authenticationService: AuthenticationService) {

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

    ngOnInit() {
        this.pushRightClass = 'push-right';
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

    logout() {
      this.authenticationService.logout();
    }

    ngOnDestroy(): void {
      if (this.authentication$) {
        this.authentication$.unsubscribe();
      }
      if (this.router$) {
        this.router$.unsubscribe();
      }
    }
}
