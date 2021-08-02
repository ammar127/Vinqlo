
import { Category } from './../../core/models/category';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Community } from './../../core/models/community';
import { CategoryService } from './../../core/services/category.service';



import { UserService } from './../../core/services/user.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})

export class CategoryComponent implements OnInit,OnChanges {
  academicesPath='/communities/get/academics'
  slug!:string;
  searchQuery!:string;

  constructor(private route:ActivatedRoute,private commonService:CommonService) {
   }
  isLoader = false;
  get categories()  {return this.commonService.categories()}
  get title (){ return this.categories.find(e=>e.slug==this.slug) }
  ngOnChanges()
  {
  
  }
  ngOnInit(): void {
      this.route.params.subscribe( res=>{ this.slug=res['slug'] }  )
  }
}
