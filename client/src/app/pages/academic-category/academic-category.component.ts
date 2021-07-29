import { Campus } from '../../core/models/campus';
import { campuses } from '../../core/constants/campuses';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core';
import { AcademicCategoryService } from 'src/app/core/services/academic-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './academic-category.component.html',
  styleUrls: ['./academic-category.component.css']
})
export class AcademicCategoryComponent implements OnInit {
  campuses!:Campus[];
  isLoader:boolean=true;
  constructor(private service:AcademicCategoryService,private campusService:AcademicCategoryService) { }

  ngOnInit(): void {
    this.getCampus();
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
