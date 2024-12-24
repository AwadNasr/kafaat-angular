import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReadingClubTripsParticipantsService {

  controllerName:string = 'ReadingClubTripParticipants';
  constructor(private http:HttpClient) { }
  getPage(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page`,data);
  }
  // getWinners(data:any):Observable<any>{
  //   return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-winners`,data);
  // }
  getHeos(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page-hero`,data);
  }
  getPageHeros(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-heros`,data);
  }
  joinClub(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/join-club`,data);
  }
  editBadge(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-badge`,data);
  }
  editShareLink(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-shareLink`,data);
  }
  editBenefits(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-benefits`,data);
  }
  editQualification(data:any):Observable<ResponseVM>{
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/edit-qualification`,data);
  }
  approveHero(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/approve-hero`,data);
  }
  disapproveHero(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/disapprove-hero`,data);
  }
  // getWinnersstatics(id:any):Observable<any>{
  //   return this.http.get<any>(`${environment.baseApiUrl}/${this.controllerName}/get-statics-prize/${id}`);
  // }
  isParticipant(data:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/isParticipant`,data);
  }
  // getApproval(data:any):Observable<any>{
  //   return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/get-approval`,data);
  // }
  // addUser(data:any):Observable<any>{
  //   return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/add-user`,data);
  // }
  // deleteUser(data:any):Observable<any>{
  //   return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/delete-user`,data);
  // }
  delete(id:any):Observable<ResponseVM>{
    return this.http.delete<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/Delete/${id}`);
  }
}
