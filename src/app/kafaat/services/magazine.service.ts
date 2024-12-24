import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseVM } from '../core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  controllerName:string = 'Magazine';
  constructor(private http:HttpClient) { }

  getAllMagazine():Observable<ResponseVM>{
    return  this.http.get<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/get-all`);
  }
}
