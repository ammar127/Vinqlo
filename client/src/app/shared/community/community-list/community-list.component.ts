import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Community, CommunityService } from 'src/app/core';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit {
  @Input() url  = '';

  communities: Community[] = [];
  hasNextPage = true;
 
  page = 1;
  isLoader = false;
  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.isLoader = true;

    let params= new HttpParams().set('page', this.page.toString());
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

}
