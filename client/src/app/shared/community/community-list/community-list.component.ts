import { Component, Input, OnInit } from '@angular/core';
import { Community } from 'src/app/core';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit {
  @Input() url  = '';

  communities: Community[] = [];
  hasNextPage = true;
  constructor() { }

  ngOnInit(): void {
  }

}
