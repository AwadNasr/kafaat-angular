import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseVM } from '../core/models/response-vm';

@Injectable({
  providedIn: 'root'
})
export class ActivityParticipantsService {

  controllerName = 'ActivityParticipants';
  constructor(private http:HttpClient) {
  }
  add(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/join-activity`,data);
  }
  exit(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/exit-activity`,data);
  }
  getDistinguishs(id:any):Observable<ResponseVM>{
    return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-distinguishs/${id}`);
  }
  getActivitiesParticipants(id:any):Observable<ResponseVM>{
    return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-all-activities-Distinguish/${id}`);
  }
  getParticipants(id:any):Observable<ResponseVM>{
    return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-all-participants/${id}`);
  }
  getAll():Observable<ResponseVM>{
    return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-all-participants"`);
  }

}
