import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Community, CommunityService, Toast } from 'src/app/core';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit,OnChanges {
  @Input() url  = '';

  @Input() slug ='';

  @Input() isJoin = true;
  @Input() searchQuery:string='';
  communities!: Community[];
  hasNextPage = true;
  noCommunity!:boolean;
  page = 1;
  isLoader = false;

  joinSlug:any = null;

  constructor(private communityService: CommunityService) { }
  ngOnChanges()
  {
    this.get();
  }
  ngOnInit(): void {
    this.get();
  }
  get() {
    this.isLoader = true;
    let params= new HttpParams().set('page', this.page.toString()).set('category',this.slug).set('title',this.searchQuery);
    console.log(params)
    this.communityService.getAll(this.url+'?'+params.toString()).subscribe(res => {
      if(res.status === 200) {
        this.isLoader = false;
        this.communities=res.data.docs;
        (this.communities.length>0)?  this.noCommunity=false : this.noCommunity=true;
        this.hasNextPage = res.data.hasNextPage;
      }
    })
  }
  getByCategory(slug:string)
  {
    this.isLoader = true;
    let params= new HttpParams().set('category', this.page.toString());
    this.communityService.getAll(this.url+'?'+params.toString()).subscribe(res => {
      if(res.status === 200) {
        this.isLoader = false;
        this.communities.push(...res.data.docs as Community[]);
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
  onJoinClick(slug: string) {
    this.joinSlug = slug;
    this.communityService.join(slug).subscribe(res => {
      if(res.status === 200) {
        Toast.fire({icon:'success', title: 'you joined a Community '});
        this.communities = this.communities.filter(c => c.slug !== slug);
        this.joinSlug = null;

      }
   } )
  }
  onUnJoinClick(slug:string)
  {
    this.communityService.unJoin(slug).subscribe(res => {
      if(res.status === 200) {
        Toast.fire({icon:'success', title: 'you joined a Community '});
        this.communities = this.communities.filter(c => c.slug !== slug);
        this.joinSlug = null;

      }
   } )
  }

}
