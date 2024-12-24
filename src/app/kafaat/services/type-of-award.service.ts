import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PagedResponse } from '../core/models/paged-response';

@Injectable({
  providedIn: 'root'
})
export class TypeOfAwardService {

  controllerName: String = "TypeOfAward"

  constructor(private http: HttpClient) {

  }
  getPage(data:any):Observable<PagedResponse>{
    return this.http.post<PagedResponse>(`${environment.baseApiUrl}/${this.controllerName}/get-page`,data);
  }
}
