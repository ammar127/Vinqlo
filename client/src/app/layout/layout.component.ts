import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  template: `
    <app-header [isAdmin]="isAdmin"></app-header>
    <div class="conatiner">
      <div class="row">
        <div *ngIf="isAdmin" class="col-md-3">
          <app-sidebar></app-sidebar>
        </div>
        <div [ngClass]="isAdmin? 'col-md-9': 'col-md-12'">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
})
export class LayoutComponent {
  isAdmin = false;
  constructor(private router: Router) {
    this.checkAdminRoute();
    router.events.subscribe((val) => {
    this.checkAdminRoute();
        
    });
  }
  checkAdminRoute() {
    this.isAdmin = this.router.url.includes('users') || this.router.url.includes('category') || this.router.url.includes('reports')
  }

}
