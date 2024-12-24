import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MainDashoardService } from "src/app/dashboard/services/main-dashoard.service";
import { environment } from "src/environments/environment.prod";
import { ResponseVM } from "../core/models/response-vm";
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientModule } from "@angular/common/http";
import { UserData } from "../core/models/UserData";
import { UserRoles } from "../core/user-roles";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  controllerName: string = 'account';
  isLoggedIn = false;
  jwt: JwtHelperService = new JwtHelperService();
  private isUserAuthSubject:BehaviorSubject<boolean>;
  constructor(private http: HttpClient, private service: MainDashoardService) {
    this.isUserAuthSubject = new BehaviorSubject<boolean>(this.isUserAuth);
  }
  get isUserAuth():boolean{
    return localStorage.getItem('token')?true:false;
  }
  get isUserAuthSubj():Observable<boolean>{
    /*
    note :- we use asObservable function to return only Observable
            as it can also returns behavoirSubject.
    */
    return this.isUserAuthSubject.asObservable();
  }

  login(model: any,fromAdminForm:boolean = false) {
    this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/login`, model).subscribe({
      next: (response: ResponseVM) => {
        if (response.statusCode == 200) {
          this.service.toastService.success(response.message);
          this.SetOrUpdateToken(response.data.token);
          this.isLoggedIn = true;
          this.isUserAuthSubject.next(true);
          if(this.currentUser().role==UserRoles.Admin && fromAdminForm){
            this.service.router.navigate(['/admin'], { replaceUrl: true });
          }else{
            this.service.router.navigate(['/kafaat'], { replaceUrl: true });
          }
        } else {
          this.service.toastService.error(response.message);
        }
      },
      error: (error) => {
        this.service.toastService.error(error);
      }
    })
  }
  private SetOrUpdateToken(token: any) {
    localStorage.setItem('token', token);
  }
  private DecodeTokenData(token: any) {
    const decodedJWT = this.jwt.decodeToken(token);
    return decodedJWT;
  }
  currentUser(): UserData {
    let _userData: UserData = {} as UserData;
    let decodedToken = this.DecodeTokenData(this.GetToken());
    _userData.id = decodedToken.UserId;
    _userData.email = decodedToken.Email;
    _userData.role = decodedToken.Role;
    _userData.userName = decodedToken.UserName;
    _userData.userImage = decodedToken.UserImage;
    _userData.userCategoryName = decodedToken.userCategoryName;
    return _userData;
  }
  public GetToken() {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      return accessToken;
    } else {
      return null;
    }
  }
  logout() {
    let userRole = this.currentUser().role;
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.isUserAuthSubject.next(false);
    this.service.router.navigate([userRole==UserRoles.Admin?'/admin-login':'/login'], { replaceUrl: true });
  }
  logoutWithoutRedirect() {
    let userRole = this.currentUser().role;
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.isUserAuthSubject.next(false);
    // this.service.router.navigate([userRole==UserRoles.Admin?'/admin-login':'/login'], { replaceUrl: true });
  }
  logoutAndRedirectToHome() {
    let userRole = this.currentUser().role;
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.isUserAuthSubject.next(false);
    this.service.router.navigate(['/'], { replaceUrl: true });
  }
  IsUserLoggenIn(): boolean {
    let token = this.GetToken();
    if (token) return !this.IsAccessTokenExpired();
    return false;
  }
  IsAccessTokenExpired(): boolean {
    var token = this.GetToken();
    if (token) return this.jwt.isTokenExpired(token);
    return false;
  }

  forgetPassword(model: any): Observable<ResponseVM> {
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/forget-password?email=${model}`,{});
  }
  changePassword(model: any): Observable<ResponseVM> {
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/change-password`, model);
  }
  checkCode(model: any): Observable<ResponseVM> {
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/check-code`, model);
  }
  createNewPassword(model: any): Observable<ResponseVM> {
    return this.http.post<ResponseVM>(`${environment.baseApiUrl}/${this.controllerName}/create-new-password`, model);
  }
  resetpassword(model:any):Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/${this.controllerName}/reset-password`,model);
  }

}
