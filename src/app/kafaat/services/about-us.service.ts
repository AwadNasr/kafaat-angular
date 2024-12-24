import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseVM } from '../core/models/response-vm';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  controllerName:string = 'kafaatFounder';
  constructor(private http:HttpClient) { }

  getAll():Observable<ResponseVM>{
    return this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-all`);
  }
  
}
