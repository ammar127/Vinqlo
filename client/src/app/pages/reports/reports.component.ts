import  Swal  from 'sweetalert2';
import { UserService, Toast } from 'src/app/core';
import { report } from './../../core/constants/report';
import { Report } from './../../core/models/report';
import { ReportService } from './../../core/services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  public isCollapsed = true;
  isLoader = false;
  status = -1;
  statuses = [
    { name: 'All', id: -1 },
    { name: 'Active', id: 1 },
    { name: 'Inactive', id: 2 },
  ];
  reports!: Report[];
  reportType = 'Users';
  constructor(private reportService: ReportService,private userService:UserService) {}

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.isLoader = true;
    this.reportService
      .getAllReports(report.findIndex((e) => e == this.reportType))
      .subscribe((res) => {
        this.isLoader = false;
        this.reports = res.data.reports.docs;
      });
  }
  onChange(type: number) {
    this.reportType = report[type];
    this.get();
  }
  deleteReport(slug:string)
  {
    this.reportService.deleteReport(slug).subscribe(
      res=> { console.log(res)}
    )
  }
  deactivateReportedUser(email:string)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you wanna de-activate this user.',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, De-activate it!',
      cancelButtonText: 'No, cancel please!',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.userService.changeStatus(email, 0).subscribe((res) => {
          if (res.status == 200) {
            this.get();
            this.userService.updateStatus(2,email).subscribe( res=>{
              if(res.status==200){
                Toast.fire({ text: 'Deactivated User Successfully', icon: 'success' })
              }
            })
          }
        });
      } else {
        Swal.fire('Cancelled', 'Your user is safe :)', 'error');
      }
    });

  }
  addStrike(email:string)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you wanna add a strike to this user.',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, Post Strike !',
      cancelButtonText: 'No, cancel please!',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.userService.changeStatus(email, 0).subscribe((res) => {
          if (res.status == 200) {
            this.get();
            this.userService.updateStatus(2,email).subscribe( res=>{
              if(res.status==200){
                Toast.fire({ text: 'Strike Posted Successfully', icon: 'success' })
              }
            })
          }
        });
      } else {
        Swal.fire('Cancelled', 'Your user is safe :)', 'error');
      }
    });
  }
}
