import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private api:ApiService) { }
  getAllReports(type:number)
  {
    return this.api.get('/reports/get/all?type='+type)
  }
}
