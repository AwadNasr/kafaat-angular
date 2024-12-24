import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KafaatSharedService } from './kafaat-shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ProfileService } from './profile.service';
import { BreadCrumbService } from './bread-crumb.service';
import { AuthService } from './auth.service';
import { AuthSharedService } from './auth-shared.service';
import { ActivityService } from './activity.service';
import { ActivityParticipantsService } from './activity-participants.service';
import { ToastrService } from 'ngx-toastr';
import { PostActivityService } from './post-activity.service';
import { ProgramsService } from './programs.service';
import { ContactUsService } from './contact-us.service';
import { AboutUsService } from './about-us.service';
import { PaymentService } from './payment.service';


@Injectable({
  providedIn: 'root'
})
export class KafaatMainService {
  membersService: any;

  constructor(
    private _formBuilder:FormBuilder,
    private _dialog: MatDialog,
    private _router: Router,
    private _location:Location,
    private _sharedService:KafaatSharedService,
    private _profileService:ProfileService,
    private _breadCrumbService:BreadCrumbService,
    private _authService:AuthService,
    private _authSharedService:AuthSharedService,
    private _activityService:ActivityService,
    private _activityParticipantsService:ActivityParticipantsService,
    private _toastService:ToastrService,
    private _postService:PostActivityService,
    private _programService:ProgramsService,
    private _contactUsService:ContactUsService,
    private _aboutUsService:AboutUsService,
    private _paymentService:PaymentService,

    ) { }

    get programService():ProgramsService{
      return this._programService;
    }
    get toastService(): ToastrService {
      return this._toastService;
    }
    get activityParticipantsService():ActivityParticipantsService{
      return this._activityParticipantsService;
    }
    get postsActivity():PostActivityService{
      return this._postService;
    }
  get formBuilder(): FormBuilder {
    return this._formBuilder;
  }
  get dialog(): MatDialog {
    return this._dialog;
  }
  get router(): Router {
    return this._router;
  }
  get sharedService(): KafaatSharedService {
    return this._sharedService;
  }
  get profileService(): ProfileService {
    return this._profileService;
  }
  get breadCrumbService(): BreadCrumbService {
    return this._breadCrumbService;
  }
  get authService(): AuthService {
    return this._authService;
  }
  get authSharedService(): AuthSharedService {
    return this._authSharedService;
  }
  get activityService():ActivityService{
    return this._activityService;
  }
  get contactUsService(): ContactUsService {
    return this._contactUsService;
  }
  get aboutUsService(): AboutUsService {
    return this._aboutUsService;
  }
  get paymentService(): PaymentService {
    return this._paymentService;
  }

  get back(){
    return this._location.back();
  }
  printFormValues(myForm:FormGroup): void {
    let  i = 0;
    let displayedValues:String = "";
    for (const controlName in myForm.controls) {
      i++;
      if (myForm.controls.hasOwnProperty(controlName)) {
        displayedValues += `${i} - ${controlName}: ${myForm.controls[controlName].value} \n`;
        console.log(`${controlName}: ${myForm.controls[controlName].value}`);
      }
    }
    alert(displayedValues);
  }
}
