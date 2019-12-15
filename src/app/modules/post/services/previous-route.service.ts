import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService implements OnDestroy {
  private previousUrl: string;
  private currentUrl: string;
  private router$: Subscription;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router$ = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }
  public getPreviousUrl() {
    return this.previousUrl;
  }
  ngOnDestroy(): void {
    if (this.router$) {
      this.router$.unsubscribe();
    }
  }
}
