import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FeedModule } from '../feed/feed.module';
import { UiKitModule } from '../ui-kit/components/uit-kit.module';
import { PostSingleComponent } from './components/post-single/post-single.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  imports: [
    FeedModule,
    PostRoutingModule,
    CommonModule,
    UiKitModule,
    MatInputModule
  ],
  exports: [PostSingleComponent],
  declarations: [PostSingleComponent],
  providers: [],
})
export class PostModule {}
