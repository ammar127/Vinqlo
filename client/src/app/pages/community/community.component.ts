import { PostService } from 'src/app/core/services/post.service';
import { CommonService, Community, Post, } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CommunityService } from 'src/app/core/services/community.service';


import { UserService } from './../../core/services/user.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent implements OnInit {

  slug!: string;
  community!: Community;
  searchQuery:string='';
  isLoader: boolean = false;
  postByCommunity = '/posts/get/by/';
  constructor(private route: ActivatedRoute,
    private communityService: CommunityService,private commonService:CommonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => this.slug = res['slug'])
    this.getCurrentCommunity();
  }
  get categories()  {return this.commonService.categories()}

  getCurrentCommunity() {
    this.communityService.getSingleCommunity(this.slug).subscribe(res => this.community = res.data)
  }

}
