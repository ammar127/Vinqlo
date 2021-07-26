import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-header></app-header>
    <div class="conatiner">
      <div class="row">
        <div class="col-md-3">
          <app-sidebar></app-sidebar>
        </div>
        <div class="col-md-9">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
})
export class LayoutComponent {}
