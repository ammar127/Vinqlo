import { Community } from './../../core/models/community';
import { CommunityService } from './../../core/services/community.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/core/models';
import { FeedService} from 'src/app/core/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  active = 1;
  closeResult = '';
  
  
  allPosts!:Post[];
  communities!:Community[];
  postSlug!:Community;
  constructor(
    private service:FeedService,
    private modalService: NgbModal,
    private fb:FormBuilder,
    private router: Router,
    private communityService:CommunityService
    )
  {
     
  }
  ngOnInit(): void {
    this.get();
  }
  get()
  {
    this.service.getAllPosts().subscribe
    (
      res=>
      {
        this.allPosts=res.data.docs;
      }
    )
  }
 
 

  onReport()
  {
    this.router.navigate(['/reports']);
  }
  openPost(slug:string)
  {
    this.router.navigate(['/post',slug])
  }
  getAllCommunities()
  {
    this.communityService.getAll().subscribe
    (
      res=>{
        this.communities=res.data.docs
      }
    )
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
