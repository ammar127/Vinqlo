import { UserService } from './core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { NgxPermissionsService } from 'ngx-permissions';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vinqlo';
  constructor(private permissionsService: NgxPermissionsService,private userService:UserService,
    private http: HttpClient) {

  }

  ngOnInit(){
    // const perm = ["1", "2"];

    // this.permissionsService.loadPermissions(perm);

    //  this.http.get('url').subscribe((permissions) => {
    //    //const perm = ["ADMIN", "EDITOR"]; example of permissions
    //    this.permissionsService.loadPermissions(['permissions']);
    // })

    this.userService.populate();
    this.userService.currentUser.subscribe(user => {
      console.log('role of user ', user.role)
      console.log(user)
      if(user && user.role){
        this.permissionsService.loadPermissions(['user.role']);
      } else {
        this.permissionsService.flushPermissions();
      }
    })
  }
}
