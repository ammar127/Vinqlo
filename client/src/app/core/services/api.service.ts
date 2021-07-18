import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient ) { }
  post(url:string,data:any):Observable<any>
  {
    return this.http.post(environment.api_url+url,data);
  }
  get(url:string)
  {
    return this.http.get(environment.api_url+url);
  }
}
