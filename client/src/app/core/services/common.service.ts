import { Campus } from './../models/campus';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class CommonService {
  private campusSubject = new BehaviorSubject<Campus[]>([]);
 
  constructor (
    private apiService: ApiService,
  ) {}

  campuses(): Campus[] {
    return this.campusSubject.value;
  }

  getCampuses() {
    return this.apiService
    .get('/user',)
    .subscribe((res => {
      // Update the campus observable
      this.campusSubject.next(res.data.campuses);
    }));
  }

}
