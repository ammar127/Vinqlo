import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

  ], exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class SharedModule { }
