import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicCategoryRoutingModule } from './academic-category-routing.module';
import { AcademicCategoryComponent } from './academic-category.component';


@NgModule({
  declarations: [
    AcademicCategoryComponent
  ],
  imports: [
    CommonModule,
    AcademicCategoryRoutingModule
  ]
})
export class AcademicCategoryModule { }
