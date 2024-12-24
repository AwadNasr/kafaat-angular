import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  file:[]=[];
  formData:FormData=new FormData();
  controllerName:string = 'uploadFiles';

  constructor(private http:HttpClient) { }

  uploadFile(data:any):Observable<ResponseVM>{
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data' 
    });
    console.log(data);
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/upload-file`,data);
  }
}
