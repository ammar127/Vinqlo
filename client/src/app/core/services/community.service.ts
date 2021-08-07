import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {


  constructor(private api:ApiService) { }
  createCommunity(formData: any): Observable<any>{ return this.api.post('/communities',formData);}

  getAll(path: string) {  return this.api.get(path); }
  getSingleCommunity(slug:string) { return this.api.get('/communities/'+slug)}
  getFollowed() {return this.api.get('/communities/get/followed')}
  join(slug: string,type:boolean)  {return this.api.post(`/communities/${type?'leave/':''}${slug}`, {})}
}
