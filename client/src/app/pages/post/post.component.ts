import { CommentService } from './../../core/services/comment.service';
import { Community } from './../../core/models/community';
import { Post } from 'src/app/core/models';
import { PostService } from './../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Toast, UserService } from 'src/app/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  slug!:string;
  postData!:Post;
  isLoader = false;
  isEdit=false;
  commentt = '';

  constructor(private route: ActivatedRoute,private service:PostService,private userService: UserService,private commentService:CommentService) { }
  get by (){  return this.userService.getCurrentUser()}
  get btnText (){ return this.isEdit ? 'Edit':'Comment'}
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
  postComment(slug:string)
  {
    if(this.btnText=='Comment')
    {
      this.commentService.postComment({body:this.commentt,post:slug}).subscribe(  res=>{
          if(res.status === 200 ) {
            this.postData.comments.push({body: this.commentt, by: this.by })
            Toast.fire({icon:'success', title:'Comment Created successfully'});
            this.commentt = '';
          }   }   )
    }
    else
    {
      this.commentService.updateComment({body:this.commentt},this.slug).subscribe(  res=>{
        if(res.status === 200 ) {
          Toast.fire({icon:'success', title:'Comment Updated successfully'});
          this.isEdit=false;

          this.commentService.getCommentOfPost(this.postData.slug).subscribe( res=>{
            this.postData.comments=res.data.comments;
          }
          )
          this.commentt = '';
        }   }   )
    }
  }
  editComment(slug:any)
  {
    this.isEdit=true;
    return this.commentService.getComment(slug).subscribe( res=>{
      if(res.status==200)
      {
        this.slug=slug;
        //Toast.fire({icon:'success', title:'Comment Updated successfully'});
        this.commentt=res.data.body;
      }
    }
  )
  }
  deleteComment(slug:any)
  {
    return this.commentService.deleteComment(slug).subscribe( res=>{
        if(res.status==200)
        {
          Toast.fire({icon:'success', title:'Comment Deleted successfully'});
        }
      }
    )
  }
}
