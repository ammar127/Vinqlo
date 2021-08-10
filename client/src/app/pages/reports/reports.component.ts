import  Swal  from 'sweetalert2';
import { UserService, Toast } from 'src/app/core';
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
  searchQuery='';
  status = -1;
  strikeCount:number=0;
  reportTypes=[{ name: 'Post', id: 0 },{ name: 'User', id: 1 },{ name: 'Community', id: 2 }];
  statuses = [{ name: 'All', id: -1 },{ name: 'Active', id: 1 },{ name: 'In-Active', id: 0 }];
  reports!: Report[];
  reportType = 1;
  constructor(private reportService: ReportService,private userService:UserService) {}

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.isLoader = true;
    this.reportService.getAllReports(this.reportType,this.searchQuery,this.status).subscribe((res) => {
        this.isLoader = false;
        this.reports = res.data.reports.docs;
      });
  }
  onChange(type: number) {
    this.reportType = this.reportTypes[type].id;
    this.get();
  }
  deleteReport(slug:string)
  {
    this.reportService.deleteReport(slug).subscribe(res=> {
      if(res.status==200){
      Toast.fire({ text: 'Report Deleted Successfully', icon: 'success' })}
    }
    )
  }
  deactivateReport(slug:string)
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
        console.log(this.reportType)
        this.reportService.updateReport(slug,this.status==0?1:0).subscribe(res=>
          {
            if(res.status==200){
              Toast.fire({ text: 'Deactivated User Successfully', icon: 'success' })
              this.reports=this.reports.filter(e=>e.slug!=slug)
              console.log(res)
              }

          })
      } else {
        Swal.fire('Cancelled', 'Your user is safe :)', 'error');
      }
    });

  }
  addStrike(email:any)
  {
    Swal.fire({ title: 'Are you sure?',text: 'you wanna add a strike to this user.',showCancelButton: true,confirmButtonColor: '#DD6B55',confirmButtonText: 'Yes, Post Strike !', cancelButtonText: 'No, cancel please!',})
    .then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.userService.changeStatus(email, 0).subscribe((res) => {
          if (res.status == 200) {
            this.get();
                Toast.fire({ text: 'Strike Posted Successfully', icon: 'success' })
          }})}
         else {
        Swal.fire('Cancelled', 'Your user is safe :)', 'error');
      }
    });
  }
}
