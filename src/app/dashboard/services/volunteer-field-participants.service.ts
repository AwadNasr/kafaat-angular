import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VolunteerFieldParticipantsService {

  controllerName:string = 'VolunteerFieldParticipants';
  constructor(private http:HttpClient) { }
  getPage(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-withoutPaging`,data);
  }
  getHeros(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-heros`,data);
  }
  getApprovedPage(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-ApprovedwithoutPaging`,data);
  }
  getDisapprovedPage(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-DisapprovedwithoutPaging`,data);
  }
  getSupervisorPage(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-SupervisedwithoutPaging`,data);
  }
  isParticipant(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/isParticipant`,data);
  }
  getApproved(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-approvedParticipants`,data);
  }
  join(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/join-Volinteer`,data);
  }
  approveUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/approve-user`,data);
  }
  disapproveUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/disapprove-user`,data);
  }
  approvHero(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/approve-hero`,data);
  }
  disapproveHero(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/disapprove-hero`,data);
  }
  editReward(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/edit-reward`,data);
  }
  approveSupervisor(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/approve-supervisor`,data);
  }
  disapproveSupervisor(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/disapprove-supervisor`,data);
  }
  editActualHours(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/edit-ActualHours`,data);
  }
  editVolunteerHours(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/edit-VolunteerHours`,data);
  }
  delete(id:any):Observable<ResponseVM>{
    return this.http.delete<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/Delete/${id}`);
  }

}
