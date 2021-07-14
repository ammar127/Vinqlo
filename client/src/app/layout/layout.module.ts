import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LayoutComponent, FooterComponent,HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[LayoutComponent]
})
export class LayoutModule { }
