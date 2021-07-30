import { Community } from './../../core/models/community';
import { CategoryService } from './../../core/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryServive:CategoryService) {
    this.get();
   }

  categoryy!:Community[];
  ngOnInit(): void {
  }
  get()
  {
    this.categoryServive.getCommunityByCategory().subscribe(res=>{
      this.categoryy=res.data.docs;
      console.log(this.categoryy[1].by)
      console.log(this.categoryy)
    })
  }

}
