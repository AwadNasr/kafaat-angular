import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReadingClubBookServiceService {
  controllerName:string = 'ReadingClubBook';
  constructor(private http:HttpClient) { }
  getPage(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-page`,data);
  }
  add(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/add-book`,data);
  }
  delete(id:any):Observable<ResponseVM>{
    return this.http.delete<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/Delete/${id}`);
  }
  update(data:any):Observable<ResponseVM>{
    return this.http.put<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-book`,data);
  }
  getById(id:any):Observable<ResponseVM>{
    return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/getBook/${id}`);
  }
}
