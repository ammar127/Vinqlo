import { Category } from './../../core/models/category';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,OnChanges {
  academicesPath='/communities/get/academics'
  slug!:string;
  searchQuery!:string;

  constructor(private route:ActivatedRoute,private commonService:CommonService) {
    this.route.params.subscribe( res=>{ this.slug=res['slug'] } )
    alert('chala')
   }
  isLoader = false;
  get categories()  {return this.commonService.categories()}
  get title (){ return this.categories.find(e=>e.slug==this.slug) }
  ngOnChanges()
  {
    this.route.params.subscribe( res=>{ this.slug=res['slug'] } )
    alert('chala')
  }
  ngOnInit(): void {
      this.route.params.subscribe( res=>{ this.slug=res['slug'] }  )
      alert('chala')
  }
}
