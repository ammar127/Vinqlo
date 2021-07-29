import { PostService } from './../../../core/services/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'post-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() url  = '';
  posts : Post[] = [];
  page = 1;
  hasNextPage = true;
  isLoader = false;
  isLike=true;
  get myStyle(){ return this.isLike? {color:'red'}:{ } }
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.isLoader = true;

    let params= new HttpParams().set('page', this.page.toString());
    this.postService.getAll(this.url+'?'+params.toString()).subscribe(res => {
      if(res.status === 200) {
        this.isLoader = false;
        if(res.data.docs) {
          this.posts.push(...res.data.docs as Post[]);
          this.hasNextPage = res.data.hasNextPage;
        } else {
          this.hasNextPage = false;
        }
      }
    })
  }
  toggleLike(like:boolean,slug:string)
  {
      this.postService.toggleLike(like?0:1,slug).subscribe( res=> {
        var foundIndex = this.posts.findIndex(x => x.slug == slug);
        this.posts[foundIndex].isLiked = !this.posts[foundIndex].isLiked;
        this.posts[foundIndex].isLiked ? this.posts[foundIndex].likeCount++ : this.posts[foundIndex].likeCount--;
      })

  }
  onLoadMoreClick() {
    this.page++;
    this.get();
  }
}
