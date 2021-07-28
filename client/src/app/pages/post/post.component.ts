import { CommentService } from './../../core/services/comment.service';
import { Community } from './../../core/models/community';
import { Post } from 'src/app/core/models';
import { PostService } from './../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  slug!:string;
  postData!:Post;
  isLoader = false;
  constructor(private route: ActivatedRoute,private service:PostService,private commentService:CommentService) { }

  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      this.slug = params['slug'];
      this.isLoader = true;
      this.service.get(this.slug).subscribe
      (
        res=>
        {
          this.isLoader = false;
          this.postData=res.data;
          console.log(this.postData)
        }
      )
    });
  }
  postComment(cmnt:string,slug:string)
  {
    this.commentService.postComment({body:cmnt,post:slug}).subscribe
    (
      res=>{console.log(res)}
    )
  }
}
