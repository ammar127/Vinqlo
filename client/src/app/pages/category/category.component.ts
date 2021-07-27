import { Component, OnInit } from '@angular/core';
import { AcademicCategoryService } from 'src/app/core/services/academic-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private service:AcademicCategoryService) { }

  ngOnInit(): void {
  }
  createCampus(name:string)
  {
    if(name !== '') {
       this.service.create(name).subscribe
    (
      res=>{alert('chala')}
    )
    }
   
  }
}
