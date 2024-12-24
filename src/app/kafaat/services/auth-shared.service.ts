import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {

  constructor() { }

  private forgetEmailSubject = new BehaviorSubject<any>(null);

  setForgetEmail(email: string) {
    localStorage.setItem('forgetEmail',email);
    // this.forgetEmailSubject.next(data);
  }

  getForgetEmail() {
    let email = localStorage.getItem('forgetEmail');
    return email;
    // return this.forgetEmailSubject.asObservable();
  }
}
