import { Component, OnInit } from '@angular/core';
import { Campus } from 'src/app/core';
import { AcademicCategoryService } from 'src/app/core/services/academic-category.service';

@Component({
  selector: 'app-academic-category',
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
