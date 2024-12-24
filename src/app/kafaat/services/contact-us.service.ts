import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseVM } from '../core/models/response-vm';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { PagedResponse } from '../core/models/paged-response';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  controllerName:string = 'contactUs';
  constructor(private http:HttpClient) {}
  sendMessage(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/add`,model);
  }
  addOrUpdateResponse(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/add-or-update-response`,model);
  }
  sendResponse(id:any):Observable<ResponseVM>{
    return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/sent-response-to-user?id=${id}`);
  }
  delete(id:any):Observable<ResponseVM>{
    return this.http.delete<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/delete?id=${id}`);
  }
  getPageNew(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page-new`,data);
  }
  getPageSent(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page-sent`,data);
  }
  getPageNotSent(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page-not-sent`,data);
  }
}
