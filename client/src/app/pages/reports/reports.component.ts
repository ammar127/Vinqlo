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
  reportType!:number;
  constructor(private reportSerice:ReportService) { }

  ngOnInit(): void {
    this.reportSerice.getAllReports().subscribe
    (
      res=>{
        this.reports=res.data.reports.docs;
      }
    )
  }

}
