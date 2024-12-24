import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VolunteerFieldParticipantService {

  controllerName: String = "VolunteeringParticipants"

  constructor(private http: HttpClient) {

  }
  join(data: any): Observable<ResponseVM> {

    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/join-Volinteer`, data);
  }
  getPage(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page`,data);
  }
  isParticipant(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/isParticipant`,data);
  }
  getParticipant(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-participant`,data);
  }

}
