import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Toast, UserService } from "src/app/core";

@Component({
    selector:'app-otp',
    templateUrl:'otp.component.html'
})
export class OtpComponent
{
    constructor(private userService:UserService,private router: Router)
    {
        
    }
    onOtpChange(e:any)
    {
        if(e.length==6)
        {
            this.userService.getOtp('/users/verify/'+e).subscribe
            (
                res=>
                {
                    this.router.navigate(['/feed'])
                },
                err=>
                {
                    alert('ni chala')
                }
            )
        }
    }
    onResendEmail() {
        Toast.fire({text: 'OTP sent to your Email', icon: 'success'})
    }
}