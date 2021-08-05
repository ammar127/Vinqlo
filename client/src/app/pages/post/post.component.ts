import { map } from 'rxjs/operators';
import { User } from './../../core/models/User';
import { CommentService } from './../../core/services/comment.service';
import { Post } from 'src/app/core/models';
import { PostService } from './../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Toast, UserService } from 'src/app/core';
import { TagData, TagifySettings } from 'ngx-tagify';
import { KeyValuePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';

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
  commentt :string=' ';
  whiteList$ = new BehaviorSubject<any[]>([]);
  mixedSettings :TagifySettings={
    mode: 'mix',
    pattern: /@/,
    tagTextProp: 'text',
    callbacks:{
      input : (e) => {
        this.service.searchByName(e.detail.value).subscribe(
          res=> {
            let usernames=res.data.users.map((e:any)=> e.firstName+' '+e.lastName)
            this.whiteList$.next(res.data.users.map((e: any) => {return {value: e.firstName+' '+e.lastName, user: e} as TagData}))

        }   ) },
    },
    dropdown: {
      enabled:1,
      maxItems:10,
      position: 'text',
      mapValueTo: 'text',
      highlightFirst: false,
    }
};

  constructor(private route: ActivatedRoute,private service:PostService,private clipboardService: ClipboardService,private userService: UserService,private commentService:CommentService) { }
  get by (){  return this.userService.getCurrentUser()}
  get btnText (){ return this.isEdit ? 'Edit':'Comment'}
  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      this.slug = params['slug'];
      this.isLoader = true;
      this.service.get(this.slug).subscribe( res=>{
          this.isLoader = false;
          this.postData=res.data;
        }
      )
    });
  }
  postComment(slug:string)
  {
    let ht;
    var raw=this.commentt.split("[[")
    ht=raw[0];
    for (let i = 1; i < raw.length ; i++){
      ht+='[[{"email":"'+JSON.parse(raw[i].split(']]')[0]).user.email+'","value":"'+JSON.parse(raw[i].split(']]')[0]).value+'"}]]'+' '+raw[i].split(']]')[1];
    }
    console.log(ht);
    if(this.btnText=='Comment')
    {
      this. commentService.postComment({body:this.commentt,post:slug}).subscribe(  res=>{
          if(res.status === 200 ) {
            this.postData.comments.push({body: this.commentt, by: this.by })
            Toast.fire({icon:'success', title:'Comment Created successfully'});
            this.commentt = ' ';
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
            }  )
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
        Toast.fire({icon:'success', title:'Comment Updated successfully'});
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
          this.commentService.getCommentOfPost(this.postData.slug).subscribe( res=>{
            this.postData.comments=res.data.comments;
            }  )
          Toast.fire({icon:'success', title:'Comment Deleted successfully'});
        }
      }
    )
  }
  toggleLike(like:boolean,slug:string)
  {
      this.service.toggleLike(like?0:1,slug).subscribe( res=> {
        this.postData.isLiked = !this.postData.isLiked;
        this.postData.isLiked ? this.postData.likeCount++ : this.postData.likeCount--;
      })

  }
  toggleSave(save:boolean,slug:string)
  {
    this.service.toggleSave(save?0:1,slug).subscribe(res=> {
      if(res.status==200){
      Toast.fire({text:save?'Post Un-Saved':'Post Saved',icon:'success'})
      this.postData.isSaved = !this.postData.isSaved;
    }})
  }
  copyContent(slug:string) {
    this.clipboardService.copyFromContent('/post/'+slug)
    Toast.fire({text:'Copied To Clipboard',icon:'success'})
  }
  goToUserProfile()
  {
    console.log('chala')
  }
}
