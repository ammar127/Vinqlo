import { Report } from './../../core/models/report';
import { ReportService } from './../../core/services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports!:Report[];
  reportType='Users';
  report=['Users','Posts','Community']
  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
    this.reportService.getAllReports(0).subscribe
    (
      res=>{
        this.reports=res.data.reports.docs;
      }
    )
  }
  onChange(type:number)
  {
    console.log(this.reportType)
    if(type>0){
       this.reportService.getAllReports(type).subscribe(res=>{this.reports=res.data.reports.docs});
       this.reportType=this.report[type];
       return this.reports
    }
    else
    {
      this.reportService.getAllReports(0).subscribe(res=>{this.reports=res.data.reports.docs});
      return this.reports
    }
  }
}
