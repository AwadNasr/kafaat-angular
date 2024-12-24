import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/app/kafaat/core/user-roles';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {
  constructor(private service:KafaatMainService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var isLoggedIn =  this.service.authService.IsUserLoggenIn();
      if(!isLoggedIn) 
      {
        this.service.router.navigate(['/login']);
        return false;
      }
      var role = this.service.authService.currentUser().role;
      if(!(role == UserRoles.Admin || role == UserRoles.Member )){
        this.service.router.navigate(['/login']);
        return false;
      }
      else{
        return true;
      }
  }
  
}
