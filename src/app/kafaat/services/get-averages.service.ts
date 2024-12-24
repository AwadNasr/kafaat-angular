import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PagedResponse } from '../core/models/paged-response';

@Injectable({
  providedIn: 'root'
})
export class GetAveragesService {

  controllerName: String = "Averages"

  constructor(private http: HttpClient) {

  }
  getAll():Observable<any>{
    return this.http.get<any>(`${environment.baseApiUrl}/${this.controllerName}/get-all`);
  }
}
