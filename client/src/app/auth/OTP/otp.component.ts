import { Component } from "@angular/core";

@Component({
    selector:'app-otp',
    templateUrl:'otp.component.html'
})
export class OtpComponent
{
    onOtpChange(e:any)
    {
        console.log(e)
    }
}