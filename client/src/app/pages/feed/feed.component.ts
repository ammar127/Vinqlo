import { Community } from './../../core/models/community';
import { CommunityService } from './../../core/services/community.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/core/models';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  active = 1;
  
  feedpath = '/posts/get/feed';
  constructor(
   
    )
  {
     
  }
  ngOnInit(): void {
  }
 
 
 

 
}
