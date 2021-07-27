import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private api:ApiService) { }
  getAllReports()
  {
    return this.api.get('/reports/get/all?type=2')
  }
}
