import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactInformationService {
controllerName:string = 'contactInformation';
constructor(private http:HttpClient) { }
get():Observable<ResponseVM>{
  return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get`);
}
createOrUpdate(model:any):Observable<ResponseVM>{
  return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/add-or-update`,model);
}
}
