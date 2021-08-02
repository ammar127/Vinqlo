
import { Category } from './../../core/models/category';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit, OnChanges } from '@angular/core';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})

export class CategoryComponent implements OnInit {
  academicesPath='/communities/get/academics'
  slug!:string;
  searchQuery:string='';

  constructor(private route:ActivatedRoute,private commonService:CommonService) {
   }
  isLoader = false;
  get categories()  {return this.commonService.categories()}
  get title (){ return this.categories.find(e=>e.slug==this.slug) }

  ngOnInit(): void {
      this.get();
  }
  get() {   this.route.params.subscribe( res=>{ this.slug=res['slug'] }  ) }
}
