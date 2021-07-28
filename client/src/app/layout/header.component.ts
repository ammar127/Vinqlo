import { Router } from '@angular/router';
import { Component, Input } from "@angular/core";
import { UserService } from "../core";

@Component(
    {
        selector: 'app-header',
        templateUrl: 'header.component.html'
    }
)
export class HeaderComponent {
    @Input() isAdmin = false;
    public isCollapsed = true;
    constructor(private userService: UserService,private router: Router){

    }
    get user() {return this.userService.getCurrentUser()}
    onLogoutClick() {
        this.userService.purgeAuth();
        this.router.navigate(['/auth/login']);
    }
}