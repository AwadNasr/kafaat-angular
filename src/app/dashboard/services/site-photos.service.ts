import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SitePhotosService {

  controllerName: String = "SitePhotos"

  constructor(private http: HttpClient) {

  }
  add(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/add`, data);
  }
  update(data:any):Observable<any>{
    return this.http.put<any>(`${environment.baseApiUrl}/${this.controllerName}/edit`,data);
  }
  getAll():Observable<any>{
    return this.http.get<any>(`${environment.baseApiUrl}/${this.controllerName}/get-all`);
  }
  getPage(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page`,data);
  }
  delete(id:any):Observable<ResponseVM>{
    return this.http.delete<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/Delete/${id}`);
  }
}
