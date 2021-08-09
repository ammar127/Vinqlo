import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Community, CommunityService, Toast } from 'src/app/core';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit {
  @Input() url  = '';

  @Input() slug ='';

  @Input() isJoin = true;
  @Input() searchQuery:string='';
  communities!: Community[];
  hasNextPage = true;
  page = 1;
  isLoader = false;
  params:any;
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
    if(this.slug!='') {
      this.params= new HttpParams().set('page', this.page.toString()).set('category',(this.slug!='')?this.slug:'').set('name',this.searchQuery);
    }
    else{
      this.params= new HttpParams().set('page', this.page.toString()).set('name',this.searchQuery);
    }
    this.communityService.getAll(this.url+'?'+this.params.toString()).subscribe(res => {
      if(res.status === 200) {
        this.isLoader = false;
        this.communities=res.data.docs;
        console.log(this.communities)
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
  onLoadMoreClick() {
    this.page++;
    this.get();
  }
  onJoinClick(slug: string,isJoined:boolean) {
    this.joinSlug = slug;
    this.communityService.join(slug,isJoined).subscribe(res => {
      if(res.status === 200 && !isJoined) {
        Toast.fire({icon:'success', title: 'you joined a Community '});
        this.communities = this.communities.filter(c => c.slug !== slug);
        this.joinSlug = null;
      }
      else if(res.status === 200 && isJoined){
        Toast.fire({icon:'success', title: 'you un-joined a Community '});
        this.communities = this.communities.filter(c => c.slug !== slug);
        this.joinSlug = null;
      }
   } )
  }
}
