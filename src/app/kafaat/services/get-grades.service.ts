import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetGradesService {

  controllerName: String = "Grades"

  constructor(private http: HttpClient) {

  }
  getAll():Observable<any>{
    return this.http.get<any>(`${environment.baseApiUrl}/${this.controllerName}/get-all`);
  }
}
