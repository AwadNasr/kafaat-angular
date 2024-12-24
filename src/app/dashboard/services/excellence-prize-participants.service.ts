import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExcellencePrizeParticipantsService {

  controllerName:string = 'ExcellencePrizeParticipants';
  constructor(private http:HttpClient) { }
  getPage(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page`,data);
  }
  getPageAsync(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-withoutPaging-withQualification`,data);
  }
  getApprovedPageAsync(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-withoutPaging-withQualification-Approved`,data);
  }
  getDisapprovedPageAsync(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-withoutPaging-withQualification-Disapproved`,data);
  }
  getPrevAsync(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-prev-withQualification`,data);
  }
  getWinners(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-winners`,data);
  }
  joinPrize(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/join-prize-with-standards`,data);
  }
  editReward(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-reward`,data);
  }
  editPlace(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-place`,data);
  }
  approveUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/approve-user`,data);
  }
  disapproveUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/disapprove-user`,data);
  }
  getWinnersstatics(id:any):Observable<any>{
    return this.http.get<any>(`${environment.baseApiUrl}/${this.controllerName}/get-statics-prize/${id}`);
  }
  isParticipant(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/isParticipant`,data);
  }
  getApproval(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-approval`,data);
  }
  addUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/add-user`,data);
  }
  deleteUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/delete-user`,data);
  }


}
