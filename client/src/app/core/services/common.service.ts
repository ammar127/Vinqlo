import { Campus } from './../models/campus';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class CommonService {
  public campusSubject = new BehaviorSubject<Campus[]>([]);
  temp!:Campus[];
  constructor (
    private apiService: ApiService,
  ) {}

  campuses(): Campus[] {
    return this.campusSubject.value;
  }

  getCommon():void {
    this.apiService.get('/common').subscribe(
      (res => {
      // Update the campus observable
      //console.log(res.data.campuses)
      this.campusSubject.next(res.data.campuses);
      //this.campusSubject.next(this.campusSubject.getValue().concat([res.data.campuses]));
    }));
  }

}
