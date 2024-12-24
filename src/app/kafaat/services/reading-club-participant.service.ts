import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseVM } from '../core/models/response-vm';

@Injectable({
  providedIn: 'root'
})
export class ReadingClubParticipantService {
  controllerName:string = 'ReadingClubParticipant';
  constructor(private http:HttpClient) { }
  add(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/join-club`,data);
  }
  getPageHero(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-page-hero`,data);
  }
  isHero(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/isParticipant`,data);
  }

}
