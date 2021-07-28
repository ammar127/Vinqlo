import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {


  constructor(private api:ApiService) { }
  getAll(path: string)
  {
    return this.api.get(path);
  }
  getFollowed() {return this.api.get('/communities/get/followed')}

}