import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor (
    private apiService: ApiService,
  ) {} 
  getFollowed() {return this.apiService.get('/communities/followed')}
}

