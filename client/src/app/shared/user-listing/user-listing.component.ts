import { Degree } from './../../core/models/campus';
import { DegreeService } from './../../core/services/degree.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {

  degrees:Degree[]=[];
  degree!:Degree;
  title!:string;
  isLoader:boolean=false;
  constructor(private modalService: NgbModal,private degreeService:DegreeService) { }
  @ViewChild('content') content! : TemplateRef<any>;
  ngOnInit(): void {
  }
  open(title:string,array:any)
  {
    this.degrees=array;
    this.title=title;
    this.modalService.open(this.content);
  }
  countMembers():boolean
  {
    var count=0;
    this.degrees.forEach((e:any) => {
      count+=e.members.length
    });
    return count==0
  }
  openSingleDegree(title:string,degree:Degree)
  {
    this.degree=degree;
    this.title=title;
    this.modalService.open(this.content);
  }
  close() {
    this.modalService.dismissAll();
  }
}

