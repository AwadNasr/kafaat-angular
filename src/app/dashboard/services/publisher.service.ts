import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  controllerName:string = 'Publisher';
  constructor(private http:HttpClient) { }
  getPage(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-Page`,data);
  }
  getPublications(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-Publications`,data);
  }
  getPageApproved(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-approved`,data);
  }
  getPageApprovedWithoutPaging(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-approved-withouPaging`,data);
  }
  join(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/join`,data);
  }
  approveUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/approve-user`,data);
  }
  disapproveUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/disapprove-user`,data);
  }
  editImage(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/edit-image`,data);
  }
  editQr(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/edit-qr`,data);
  }
  editLink(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/edit-link`,data);
  }
  delete(id:any):Observable<ResponseVM>{
    return this.http.delete<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/Delete/${id}`);
  }
  getById(id:any):Observable<any>{
    return this.http.get<any>(`${environment.baseApiUrl}/${this.controllerName}/get-by-id/${id}`);
  }
}
