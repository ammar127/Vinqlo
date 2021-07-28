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
        this.posts.push(...res.data.docs as Post[]);
        this.hasNextPage = res.data.hasNextPage;
      }
    })
  }
  onReport() {
    
  }
  onLoadMoreClick() {
    this.page++;
    this.get();
  }
}
