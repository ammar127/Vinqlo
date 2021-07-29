import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './academic-category-routing.module';
import { AcademicCategoryComponent } from './academic-category.component';


@NgModule({
  declarations: [
    AcademicCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class AcademicCategoryModule { }
