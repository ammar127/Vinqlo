import { TagifyModule } from 'ngx-tagify';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, PostRoutingModule, SharedModule,FormsModule, TagifyModule],
})
export class PostModule {}
