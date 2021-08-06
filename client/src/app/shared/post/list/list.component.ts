import { Toast } from './../../../core/constants/Toast';
import { PostService } from './../../../core/services/post.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/core';
import { HttpParams } from '@angular/common/http';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'post-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit,OnChanges {

  @Input() url  = '';
  posts : Post[]=[] ;
  @Input() email='';
  page = 1;
  hasNextPage = true;
  isLoader = false;
  type:number=0;
  @Input() searchQuery:string='';
  constructor(private postService: PostService,private clipboardService: ClipboardService) {}
  ngOnChanges()
  {
    if(this.searchQuery!=''){
    this.get();}
  }
  ngOnInit(): void {
    this.get();
  }
  get() {
    this.isLoader = true;
    this.postService.getAll(this.url,this.page,this.type,this.searchQuery,this.email).subscribe(res => {
      if(res.status === 200) {
        this.isLoader = false;
       if(this.searchQuery==''){
        if(res.data.docs) {
          this.posts.push(...res.data.docs as Post[]);
          this.hasNextPage = res.data.hasNextPage;
        } else {
          this.hasNextPage = false;
        }
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
  toggleSave(save:boolean,slug:string)
  {
    this.postService.toggleSave(save?0:1,slug).subscribe(res=> {
      if(res.status==200){
      Toast.fire({text:save?'Post Un-Saved':'Post Saved',icon:'success'})
      var foundIndex = this.posts.findIndex(x => x.slug == slug);
      this.posts[foundIndex].isSaved = !this.posts[foundIndex].isSaved;
    }})
  }
  onLoadMoreClick() {
    this.page++;
    this.get();
  }
  copyContent(slug:string) {
    this.clipboardService.copyFromContent('/post/'+slug)
    Toast.fire({text:'Copied To Clipboard',icon:'success'})
  }
}
