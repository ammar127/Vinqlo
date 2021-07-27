import { Component } from '@angular/core';
import { CommonService, UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vinqlo';
  constructor(private commonService: CommonService, private userService: UserService) {
    this.commonService.getCommon();
    this.userService.populate();
  }
}
