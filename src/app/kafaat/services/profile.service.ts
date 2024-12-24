import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseVM } from '../core/models/response-vm';
import { EditFieldRequest } from '../core/models/edit-field-request';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  controllerName:string = 'account';
  constructor(private http:HttpClient) {}
  register(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/register`,model);
  }
  editProfile(model:EditFieldRequest):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-user-profile`,model);
  }
  editUserProfile(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-user`,model);
  }
  editProfileBirthDate(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-user-profile-birth-date`,model);
  }
  uploadFile(model:FormData):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/upload-profile-file`,model);
  }
  getUserProfile(model:any):Observable<ResponseVM>{
    
   var x=  this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-user-profile`,model);
   x.subscribe(res=>console.log(res.data));
   
   
   return x;
  }
  getUserProfileByEmail(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-user-profileByEmail`,model);
  }
  changePassword(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/change-password`,model);
  }
  IsPasswordValid(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/check-password-validity`,model);
  }
  deleteAccount(model:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/delete-account`,model);
  }
}
