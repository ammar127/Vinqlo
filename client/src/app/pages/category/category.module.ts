import { CategoryRoutingModule } from './../academic-category/academic-category-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [ CommonModule,SharedModule,CategoryRoutingModule ]
})
export class CategoryModule { }
