import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TypeActivityService{
 controllerName:String="ActivityType"
constructor(private http:HttpClient) { 

}
add(data:any):Observable<ResponseVM>{
  return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/Add`,data);
}

getPage(data:any):Observable<PagedResponse>{
  return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page`,data);
}

getAll():Observable<ResponseVM>{
  return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-all`);
}

update(data:any):Observable<ResponseVM>{
  return this.http.put<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit`,data);
}
delete(id: number): Observable<ResponseVM> {
  return this.http.delete<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/delete/${id}`);
}




}
export interface TypeActivity{
id:number;
type:String; 
description:String
}