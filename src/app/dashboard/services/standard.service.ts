import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  controllerName: String = "Standards"
  constructor(private http: HttpClient) {

  }
  add(data: any): Observable<ResponseVM> {
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/add`, data);
  }
  update(data: any): Observable<any> {
    return this.http.put<any>(`${environment.baseApiUrl}/${this.controllerName}/update`, data);
  }
  getPage(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-page`,data);
  }
  getStandardOfPrize(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-standards-with-value-types`,data);
  }
  delete(id:any):Observable<ResponseVM>{
    return this.http.delete<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/Delete/${id}`);
  }
}
