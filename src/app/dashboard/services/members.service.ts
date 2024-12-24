import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';
import { changeUserRoleModel, userEmailModel } from '../core/models/member-models';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  controllerName:string = 'account';
  constructor(private http:HttpClient) { }
  getAdminsPage(model:PagedRequest):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-all-admin-users`,model);
  }
  getMembersPage(model:PagedRequest):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-all-member-users`,model);
  }
  getMembersWhithoutPaging(model:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-all-member-users-withouPaging`,model);
  }
  getJoinRequestsPage(model:PagedRequest):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-all-un-approved-users`,model);
  }
  changeUserRole(model:changeUserRoleModel):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/change-user-role`,model);
  }
  approveMembership(model:userEmailModel):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/approve-to-user-account`,model);
  }
  restoreUserToJoinRequestState(model:userEmailModel):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/restore-user-account-to-join-request-state`,model);
  }
  sendEmailToUser(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/send-mail-to-user`,model);
  }
  deleteAccount(email:any):Observable<ResponseVM>{
    var model = {email:email};
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/delete-account`,model);
  }
  changeUserCategory(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/change-user-category`,model);
  }
  getUserCategory(email:any):Observable<ResponseVM>{
    return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-user-category?email=${email}`);
  }
}
