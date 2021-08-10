import { Community } from './../../../core/models/community';
import { CommunityService } from './../../../core/services/community.service';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toast, UserService } from 'src/app/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'post-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  addPostForm!:FormGroup;
  tag = '';
  commuities: Community[] = [];
  @Output() success = new EventEmitter;
  @ViewChild('content') content! : TemplateRef<any>;
  constructor(private fb: FormBuilder,
    private postService: PostService,
    private communityService: CommunityService,
    private modalService: NgbModal) {
    this.create();
    this.getCommunities();
   }

  ngOnInit(): void {
  }
  getCommunities() {
    this.communityService.getFollowed().subscribe(res => {
      if(res.status === 200) {
        this.commuities = res.data.docs;
      }
    })
  }
  onPost()
  {

    this.postService.createPost(this.addPostForm.value)
    .subscribe(res=> {
      if(res.status === 200) {
        Toast.fire({icon:'success', title:'Post Created successfully'});
        this.close();
        this.addPostForm.reset();
        this.success.emit();
      }
    });
  }
  open() {
    this.modalService.open(this.content)
  }
  close() {
    this.modalService.dismissAll();
  }
  create() {
    this.addPostForm = this.fb.group({
      community: ['', Validators.required],
      title: ['',[ Validators.required, Validators.minLength(10)]],
      body: ['', [ Validators.required, Validators.minLength(10)]],
      tags:[[]],
      image: ['']
    });

  }
  get f() {return this.addPostForm.controls;}
  onAddTag() {
    let t = this.tag.trim();
    if (t && t !== "") {
      const a = this.f.tags.value? this.f.tags.value: [] ;
      this.f.tags.setValue([...a, t]);
      this.tag = '';
    }

  }
  onRemoveTag(index: number) {
    const a = this.f.tags.value;
    a.splice(index, 1)
    this.f.tags.setValue([...a])
  }
}
