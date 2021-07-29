import { report } from './../../core/constants/report';
import { Report } from './../../core/models/report';
import { ReportService } from './../../core/services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public isCollapsed = true;
  isLoader = false;

  reports!: Report[];
  reportType = 'Users';
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.get();

  }
  get() {
    this.isLoader = true;
    this.reportService.getAllReports(report.findIndex(e => e == this.reportType)).subscribe(res => {
      this.isLoader = false;
      this.reports = res.data.reports.docs });
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
}
