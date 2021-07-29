import { CommonService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    //this.get();
  }
  get category()  {return this.commonService.categories(); }
}
