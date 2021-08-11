import { Toast } from './../../core/constants/Toast';
import { CommonService } from './../../core/services/common.service';
import { Community, CommunityService } from 'src/app/core';
import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-init-comunity',
  templateUrl: './init-comunity.component.html',
  styleUrls: ['./init-comunity.component.css']
})
export class InitComunityComponent implements OnInit {
  active = 'top';
  step=1;
  slug:string='';
  joinSlug='';
  communities:Community[]=[];
  get categories()  {return this.commonService.categories(); }
  constructor(private router:Router,private communityService: CommunityService,private commonService:CommonService) { }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ngOnInit(): void {
  }
  getComunities(catSlug:string)
  {
    this.slug=this.categories[0].slug;
    this.communityService.getCommunitiesByCategory('/communities/get/academics',this.slug).subscribe(res=>
      {
        if(res.status==200){
          this.communities=res.data.docs;
        }
      })
  }
  checkClick(){
    this.router.navigate(['/feed'])
  }
  onJoinClick(slug: string,isJoined:boolean) {
    this.joinSlug = slug;
    this.communityService.join(slug,isJoined).subscribe(res => {
      if(res.status === 200 && !isJoined) {
        Toast.fire({icon:'success', title: 'you joined a Community '});
        this.communities[this.communities.findIndex(c => c.slug == slug)].isJoined=!this.communities[this.communities.findIndex(c => c.slug == slug)].isJoined;
        this.joinSlug = '';
      }
      else if(res.status === 200 && isJoined){
        Toast.fire({icon:'success', title: 'you un-joined a Community '});
        this.communities[this.communities.findIndex(c => c.slug == slug)].isJoined=!this.communities[this.communities.findIndex(c => c.slug == slug)].isJoined;
        this.joinSlug = '';
      }
   } )
  }
}
