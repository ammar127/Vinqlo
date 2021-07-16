import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService:ApiService) { }
  post(type:string,formData:any): Observable<any>
  {
    return this.apiService.post(type,formData);
  }
}
