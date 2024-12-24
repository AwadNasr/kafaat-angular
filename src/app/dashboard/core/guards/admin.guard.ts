import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { UserRoles } from 'src/app/kafaat/core/user-roles';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private service:KafaatMainService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var isLoggedIn =  this.service.authService.IsUserLoggenIn();
      if(!isLoggedIn) 
      {
        this.service.router.navigate(['/admin-login']);
        return false;
      }
      var role = this.service.authService.currentUser().role;
      if(!(role == UserRoles.Admin)){
        this.service.router.navigate(['/admin-login']);
        return false;
      }
      else{
        return true;
      }
  }



  
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     var token=localStorage.getItem('token');
  //     if(!token) 
  //     {
  //       this.router.navigate(['/login'])
  //       return false;
  //     }
  //   return true;
  // }
  
}
