import { PostService } from 'src/app/core/services/post.service';
import { Community, Post, } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/core/services/community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  slug!:string;
  community!:Community;
  posts!:Post[];
  isLoader:boolean=false;
  constructor(private route:ActivatedRoute,private communityService:CommunityService,private postService:PostService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res=>this.slug=res['slug'])
    this.getCurrentCommunity();
    this.getPostsByCommunity();
  }
  getCurrentCommunity()
  {
    this.communityService.getSingleCommunity(this.slug).subscribe(res=>this.community=res.data)
  }
  getPostsByCommunity()
  {
    this.isLoader=true;
    this.postService.getPostByCommunity(this.slug).subscribe(res=>{this.posts=res.data
      this.isLoader=false})
  }
}
