import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseVM } from '../core/models/response-vm';
import { PagedResponse } from '../core/models/paged-response';

@Injectable({
  providedIn: 'root'
})
export class ExcellenceAwardParticipantService {

  controllerName: String = "ExcellenceAwardParticipant"

  constructor(private http: HttpClient) {

  }
  join(data: any): Observable<ResponseVM> {
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/join-award`, data);
  }
  isParticipant(data: any): Observable<ResponseVM> {
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/isParticipant`, data);
  }
  getResponse(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-response`, data);
  }
  getPage(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page`,data);
  }

}
