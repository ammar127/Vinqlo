import { Component, OnInit,  } from '@angular/core';
import { NotificationService, User, UserService } from 'src/app/core';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


  result:any = null;
  constructor(private notificationService: NotificationService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user:any) => {
      if(user){
        this.get();
        this.notificationService.getEvent(user._id).subscribe((res : any) => this.get());

      }
    })
  }
  get() {
    this.notificationService.getNotification().subscribe((res : any) => {

      if(res.status === 200) {
        this.result = res.data.notifications;
      }
    }, (err : any)=> {

    })
  }
  onMarkALLClick() {
    this.notificationService.markAll().subscribe((res : any) => {
      if(res.status === 200) {
       this.get();
      }
    })
  }
  onClickNotification(notification: any){
    // open the notification here
    this.notificationService.markAsRead(notification._id).subscribe((res : any)=> {
      if(res.status === 200) {
       this.get();
      }
    })
  }

}
