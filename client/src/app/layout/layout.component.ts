import { Component } from "@angular/core";

@Component({
    selector:'app-layout',
    template:`
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    `
})
export class LayoutComponent{

}