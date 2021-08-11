import { Component, OnInit } from '@angular/core';
import { Campus } from 'src/app/core';
import { AcademicCategoryService } from 'src/app/core/services/academic-category.service';
import { ReportService } from './../../core/services/report.service';
@Component({
  selector: 'app-academic-category',
  templateUrl: './academic-category.component.html',
  styleUrls: ['./academic-category.component.css']
})
export class AcademicCategoryComponent implements OnInit {
  reportType = 1;
  campuses!:Campus[];
  isLoader:boolean=true;
  constructor(private reportService: ReportService, private service:AcademicCategoryService,private campusService:AcademicCategoryService) { }
  reportt=[{ name: 'Post', id: 0 },{ name: 'User', id: 1 },{ name: 'Community', id: 2 }];
  ngOnInit(): void {
    this.getCampus();
    this.get();
  }
  
  get() {
    this.isLoader = true;
    
  }
  getCampus()
  {

    this.campusService.getCampuses().subscribe
    (
      res=>{
      this.campuses=res.data.campuses
      this.isLoader=false;
    }
    )
  }
  createCampus(name:string)
  {
    if(name !== '') {
       this.service.create(name).subscribe
       (
         res=>{console.log(res)}
       )
       this.getCampus();
    }

  }

}
