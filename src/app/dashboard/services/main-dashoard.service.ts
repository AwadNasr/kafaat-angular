import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivityService } from './activity.service';
import { CountryService } from './country.service';
import { CityService } from './city.service';
import { DistrictService } from './district.service';
import { ToastrService } from 'ngx-toastr'; import { UserCategoryService } from './user-category.service';
import { TypeActivityService } from './type-activity.service';
import { ProgramsService } from './programs.service';
import { QualificationService } from './qualification.service';
import { SpecializationService } from './specialization.service';
import { DepartmentService } from './department.service';
import { WorkTypeService } from './work-type.service';
import { DistinguishedTypeService } from './distinguished-type.service';
import { FamilyBranchService } from './family-branch.service';
import { UploadFileService } from './upload-file.service';
import { AttachmentsActivityService } from './attachments-activity.service';
import { ContactInformationService } from './contact-information.service';
import { MembersService } from './members.service';
import { ActivityParticipantsService } from './activity-participants.service';
import { PostService } from './post.service';
import { AccountService } from './account.service';
import { KafaatFounderService } from './kafaat-founder.service';
import { DocumentedImageService } from 'src/app/kafaat/services/documented-image.service';
import { StatisticsService } from './statistics.service';
import { MixService } from './mix.service';
import { MagazineService } from './magazine.service';
import { MagazinePageService } from './magazine-page.service';
import { ArticleServiceService } from './article-service.service';
import { WrittingsService } from './writtings.service';
import { ReadingClubService } from './reading-club.service';
import { ReadingClubReportService } from './reading-club-report.service';
import { ReadingClubParticipantService } from './reading-club-participant.service';
import { ReadingClubBookServiceService } from './reading-club-book-service.service';

@Injectable({
  providedIn: 'root'
})
export class MainDashoardService {

  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _router: Router,
    private _location: Location,
    private _account: AccountService,
    private _activityService: ActivityService,
    private _countryService: CountryService,
    private _cityService: CityService,
    private _districtService: DistrictService,
    private _toastService: ToastrService,
    private _userCategoryService: UserCategoryService,
    private _typeActivity: TypeActivityService,
    private _programsService: ProgramsService,
    private _qualificationService: QualificationService,
    private _specializationService: SpecializationService,
    private _departmentService: DepartmentService,
    private _workTypeService: WorkTypeService,
    private _distinguishedTypeService: DistinguishedTypeService,
    private _familyBranchService: FamilyBranchService,
    private _uploadFileService: UploadFileService,
    private _activityAttachments: AttachmentsActivityService,
    private _activityParticipants: ActivityParticipantsService,
    private _contactInformationService: ContactInformationService,
    private _membersService: MembersService,
    private _postService: PostService,
    private _kafaatFounderService: KafaatFounderService,
    private _documentedImageService: DocumentedImageService,
    private _statistics: StatisticsService,
    private _mixService: MixService,
    private _magazineService: MagazineService,
    private _magazinePageService: MagazinePageService,
    private _atricleService: ArticleServiceService,
    private _writtingService: WrittingsService,
    private _readingClubService: ReadingClubService,
    private _readingClubParticipantService: ReadingClubParticipantService,
    private _readingClubReportService: ReadingClubReportService,
    private _readingclubBookservice:ReadingClubBookServiceService,
  ) { }

  get statistics() {
    return this._statistics;
  }
  get postService(): PostService {
    return this._postService;
  }
  get activityParticipantsService() {
    return this._activityParticipants;
  }
  get readingClubParticipantService() {
    return this._readingClubParticipantService;
  }

  get formBuilder(): FormBuilder {
    return this._formBuilder;
  }
  get accountService(): AccountService {
    return this._account;
  }
  get dialog(): MatDialog {
    return this._dialog;
  }
  get router(): Router {
    return this._router;
  }
  get activityService(): ActivityService {
    return this._activityService;
  }


  get countryService(): CountryService {
    return this._countryService;
  }
  get programsService(): ProgramsService {
    return this._programsService;
  }
  get typeActivity(): TypeActivityService {
    return this._typeActivity;
  }
  get cityService(): CityService {
    return this._cityService;
  }
  get userCategoryService(): UserCategoryService {
    return this._userCategoryService;
  }
  get districtService(): DistrictService {
    return this._districtService;
  }
  get toastService(): ToastrService {
    return this._toastService;
  }
  get attachmentsActivity(): AttachmentsActivityService {
    return this._activityAttachments;
  }
  get qualificationService(): QualificationService {
    return this._qualificationService;
  }
  get specializationService(): SpecializationService {
    return this._specializationService;
  }
  get departmentService(): DepartmentService {
    return this._departmentService;
  }

  get workTypeService(): WorkTypeService {
    return this._workTypeService;
  }
  get distinguishedTypeService(): DistinguishedTypeService {
    return this._distinguishedTypeService;
  }
  get familyBranchService(): FamilyBranchService {
    return this._familyBranchService;
  }
  get uploadFileService(): UploadFileService {
    return this._uploadFileService;
  }
  get contactInformationService(): ContactInformationService {
    return this._contactInformationService;
  }
  get membersService(): MembersService {
    return this._membersService;
  }
  get kafaatFounderService(): KafaatFounderService {
    return this._kafaatFounderService;
  }
  get documentedImageService(): DocumentedImageService {
    return this._documentedImageService;
  }
  get mixService(): MixService {
    return this._mixService;
  }
  get magazineService(): MagazineService {
    return this._magazineService;
  }
  get magazinePageService(): MagazinePageService {
    return this._magazinePageService;
  }
  get articleService(): ArticleServiceService {
    return this._atricleService;
  }
  get writtingService(): WrittingsService {
    return this._writtingService;
  }
  get readingClubService(): ReadingClubService {
    return this._readingClubService;
  }
  get ReadingClubReportService(): ReadingClubReportService {
    return this._readingClubReportService;
  }
  get ReadingClubBookService(): ReadingClubBookServiceService {
    return this._readingclubBookservice;
  }



  get back() {
    return this._location.back();
  }
  printFormValues(myForm: FormGroup): void {
    let i = 0;
    let displayedValues: String = "";
    for (const controlName in myForm.controls) {
      i++;
      if (myForm.controls.hasOwnProperty(controlName)) {
        displayedValues += `${i} - ${controlName}: ${myForm.controls[controlName].value} \n`;
        console.log(`${controlName}: ${myForm.controls[controlName].value}`);
      }
    }
    alert(displayedValues);
  }
  mapFormValuesToFormData(myForm: FormGroup): FormData {
    let formData = new FormData();
    let i = 0;
    for (const controlName in myForm.controls) {
      i++;
      if (myForm.controls.hasOwnProperty(controlName)) {
        formData.append(`${controlName}`, `${myForm.controls[controlName].value}`);
        console.log(`${controlName}`, `${myForm.controls[controlName].value}`);
      }
    }
    return formData;
  }
  convertFormGroupToFormData(form: FormGroup): FormData {
    const formData = new FormData();

    function appendToFormData(formGroup: FormGroup, formData: FormData, keyPrefix = ''): void {
      Object.keys(formGroup.controls).forEach((controlName: string) => {
        const formControl: FormControl = formGroup.controls[controlName] as FormControl;
        const key = keyPrefix ? `${keyPrefix}_${controlName}` : controlName;

        if (formControl.value instanceof FileList) {
          const fileList: FileList = formControl.value;
          for (let i = 0; i < fileList.length; i++) {
            const file: File | null = fileList.item(i);
            formData.append(key, file!, file?.name);
          }
        } else {
          formData.append(key, formControl.value);
        }

        if (formControl instanceof FormGroup) {
          appendToFormData(formControl, formData, key);
        }
      });
    }

    appendToFormData(form, formData);
    return formData;
  }

  getFormErrors(formGroup: FormGroup | FormArray): { controlName: string, ErrorMsg: string }[] {
    let formErrors: { controlName: string, ErrorMsg: string }[] = [];
    let required = " هذا الحقل مطلوب";
    Object.keys(formGroup.controls).forEach(controlName => {
      const control: AbstractControl | null = formGroup.get(controlName);

      if (control instanceof FormControl && control.invalid && control.touched) {
        Object.keys(control.errors!).forEach(errorName => {
          let errorMessage = '';

          if (errorName === 'required') {
            errorMessage = required;
          }

          formErrors.push({ controlName: controlName, ErrorMsg: errorMessage });
        });
      }

      if (control instanceof FormArray) {
        control.controls.forEach((arrayControl, index) => {
          if (arrayControl instanceof FormGroup || arrayControl instanceof FormArray) {
            const nestedErrors = this.getFormErrors(arrayControl);
            if (nestedErrors.length > 0) {
              formErrors = formErrors.concat(nestedErrors);
            }
          }
        });
      }

      if (control instanceof FormGroup || control instanceof FormArray) {
        const nestedErrors = this.getFormErrors(control);
        if (nestedErrors.length > 0) {
          formErrors = formErrors.concat(nestedErrors);
        }
      }
    });

    return formErrors;
  }
  markAllAsTouched(myForm: FormGroup): void {
    for (const controlName in myForm.controls) {
      if (myForm.controls.hasOwnProperty(controlName)) {
        myForm.controls[controlName].markAsTouched();
      }
    }
  }
  markAllFormArrayControlsAsTouched(formArray: FormArray) {
    formArray.controls.forEach((control: any) => {
      Object.values(control.controls).forEach((formControl: any) => {
        formControl.markAsTouched();
      });
    });
  }
  printAllData(myForm: FormGroup): void {
    let i = 0;
    let displayedValues: String = "";
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
