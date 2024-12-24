import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { DateAdapter } from '@angular/material/core';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { PdfViewrComponent } from 'src/app/kafaat/components/pdf-viewr/pdf-viewr.component';
import { CvImagePopupComponent } from 'src/app/shared/components/cv-image-popup/cv-image-popup.component';
import { IProfile } from 'src/app/kafaat/core/models/Iprofile';
import { HttpClient } from '@angular/common/http';
import { PdfPopupComponent } from 'src/app/kafaat/components/pdf-popup/pdf-popup.component';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { ProfileChangePasswordComponent } from 'src/app/kafaat/components/profile-change-password/profile-change-password.component';
import { ChangePasswordMembersComponent } from '../change-password-members/change-password-members.component';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit , AfterViewInit{
  windowWidth: number = 0;
  isPasswordPageVisible:boolean = false;
  resetPasswordForm: FormGroup;
  profile:IProfile={

  } as IProfile;
  profileId:string;
  imagefile:any = "";
  fileName:string="";
  fileSize:number=0;
  errorMessage:string = "";
  countries:any[]=[];
  cities:any[]=[];
  categories:any[]=[];
  districts:any[]=[];
  familyBranches:any[]=[];
  distinguishedTypes:any[]=[];
  departments:any[]=[];
  qualifications:any[]=[];
  specializations:any[]=[];
  workTypes:any[]=[];
  userProfileImage:string = '/assets/images/male.png';
  userCvFile:any;
  formData:FormData = new FormData();
  isCountryChanged:boolean=false;
  isCityChanged:boolean=false;
  isQualificationChanged:boolean=false;
  isDepartmentChanged:boolean=false;
  isNewSelectedFile:boolean=true;
  birthDateObj:any = {hijry:'',milady:''};
  convertedDate:any
  formData2:FormData = new FormData();
  memberEmail: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialog: MatDialog,private service:KafaatMainService,private adminService:MainDashoardService,
  private dateProvider:DateAdapter<Date>,private jak:NgxMatDateAdapter<Date>,private http: HttpClient,private dialogRef: MatDialogRef<EditMemberComponent>,private cdr: ChangeDetectorRef){
    jak.setLocale('ar-sa');
    dateProvider.setLocale('ar-eg');
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }
  ngOnInit(): void {
    this.memberEmail=this.data.email;
    this.isPasswordPageVisible = false;
    setTimeout(() => {
      this.loadProfile();
    }, 2000);

  }
  onUserImageSelected(event: any) {
    const image = event.target.files[0];
     let checkResult = this.validateUplodedFile(image);
     if(checkResult!=''){
      this.adminService.toastService.warning(checkResult);
      return;
    }
    this.userProfileImage = URL.createObjectURL(image);

    const formData =  new FormData();
    //let _userEmail = this.service.authService.currentUser().email;
    formData.append("Email",this.profile.id);
    formData.append("FieldName",'UserImage');
    formData.append("NewValue",image);

    if(!(formData.has('Email') || formData.has('FieldName') || formData.has('NewValue'))){
      this.adminService.toastService.warning('البيانات غير مكتملة');
      return;
    }
    this.service.profileService.uploadFile(formData).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.adminService.toastService.success(res.message);
        }else{
          this.adminService.toastService.warning(res.message);
        }
      },error:(error)=>{
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        this.adminService.toastService.error(errorMessage);
      }
    });
  }
  onSelectedCVFile(event: any) {
    const image = event.target.files[0];
     let checkResult = this.validateUplodedFile(image,true);
     if(checkResult!=''){
      this.adminService.toastService.warning(checkResult);
      return;
    }
    this.userCvFile = URL.createObjectURL(image);

    const formData =  new FormData();
    //let _userEmail = this.service.authService.currentUser().email;
    formData.append("Email",this.profile.id);
    formData.append("FieldName",'CVImage');
    formData.append("NewValue",image);

    if(!(formData.has('Email') || formData.has('FieldName') || formData.has('NewValue'))){
      this.adminService.toastService.warning('البيانات غير مكتملة');
      return;
    }
    this.service.profileService.uploadFile(formData).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.adminService.toastService.success(res.message);
          this.getUserCvFile(this.profile.cvPath);
        }else{
          this.adminService.toastService.warning(res.message);
        }
      },error:(error)=>{
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        this.adminService.toastService.error(errorMessage);
      }
    });
    //window.location.reload();
  }
  validateUplodedFile(image:any,isCv:boolean = false):string{
    let imageError = "";
    let maxLimitedSize = 1024*1024*10;
    let _fileSize = image.size;  //in MB
    if(_fileSize>maxLimitedSize){
      imageError = "حجم الملف يتجاوز الحد المسموح به";
      return imageError;
    }
    let fileName = image.name;
     let fileArray:String = fileName.replace(' ','').split(".");
     let fileExtension = fileArray[fileArray.length-1].toLowerCase().toString();
    //  debugger;
    if (isCv) {
      if (fileExtension != "jpg" && fileExtension != "png" && fileExtension != "jpeg" && fileExtension != "pdf") {
        imageError = "نوع الملف  غير مسموح به";
        return imageError;
      }
    }
    else {
      if (fileExtension != "jpg" && fileExtension != "png" && fileExtension != "jpeg") {
        imageError = "نوع الملف  غير مسموح به";
        return imageError;
      }
    }
    return imageError;
  }

  //windowWidth: number = 0;
  valueEmitted(event: any) {
    this.isPasswordPageVisible = event;
    console.log(event);

    // const dialogRef = this.service.dialog.open(ProfileChangePasswordComponent, {
    //   width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
    //   height:'95vh'
    // });

  }
  loadCountries(){
    this.adminService.countryService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.countries = res.data;
          this.loadAllCitiesRelated(this.profile.countryId);
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadAllCitiesRelated(id:number){
    this.adminService.cityService.getAllByCountryId(id).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.cities = res.data;
          this.loadAllDistrictRelated(this.profile.cityId);
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadAllDistrictRelated(id:number){
    this.adminService.districtService.getAllByCityId(id).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.districts = res.data;
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadFamilyBranches(){
    this.adminService.familyBranchService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.familyBranches = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadDistinguishedTypes(){
    this.adminService.distinguishedTypeService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.distinguishedTypes = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadQualifications(){
    this.adminService.qualificationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.qualifications = res.data;
          this.loadAllDepartments();
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadAllSpecializations(id:any){
    this.adminService.specializationService.getAllByDepartmentId(id).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.specializations = res.data;

        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadAllCategories(){
    this.adminService.userCategoryService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.categories = res.data
         // this.loadAllSpecializations(this.profile.departmentId);
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadAllDepartments(){
    this.adminService.departmentService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.departments = res.data
          this.loadAllSpecializations(this.profile.departmentId);
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadRelatedSpecializations(id:any){
    console.log(id);
    console.log(this.profile.departmentId);

    this.adminService.specializationService.getAllByDepartmentId(id).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.specializations = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  departmentDisabled:boolean=false;
  specializationDisabled:boolean=false;
  loadRelatedDepartments(){
    this.adminService.departmentService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.departments = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
    const selectedQualificationId = this.profile.qualificationId;
    console.log(selectedQualificationId);
    if (selectedQualificationId == 10013 || selectedQualificationId == 10014) {
      console.log(selectedQualificationId);
        this.profile.departmentId=39;
        this.departmentDisabled = true;
        this.profile.specializationId=276;
        this.specializationDisabled = true;
    }else{
      this.departmentDisabled = false;
      this.specializationDisabled = false;
    }
  }
  loadWorkTypes(){
   this.adminService.workTypeService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.workTypes = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadCities(id:any){
    this.adminService.cityService.getAllByCountryId(id).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.cities = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadDistricts(id:any){
      this.adminService.districtService.getAllByCityId(id).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.districts = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  // loadProfile(){
  //   let _user = this.service.authService.currentUser();
  //   let _email = _user.id;
  //   console.log(_email);
  //   let model = {"email":_email};
  //   this.service.profileService.getUserProfile(model).subscribe({
  //     next:(res:ResponseVM)=>{
  //       if(res.statusCode==200){

  //         this.profile = res.data as IProfile;
  //         console.log(res.data);

  //         //this.birthDateObj.hijry = this.profile.birthDateInHijri;
  //         //this.birthDateObj.milady=this.profile.birthDateInAD;




  //         // this.profile.qualificationId = 0;
  //         this.loadCountries();
  //         this.loadAllCitiesRelated(this.profile.countryId);
  //         this.loadAllDistrictRelated(this.profile.cityId);

  //         this.loadFamilyBranches();
  //         this.loadDistinguishedTypes();
  //         this.loadWorkTypes();

  //         this.loadQualifications();
  //         this.loadRelatedSpecializations(this.profile.specializationId);
  //         this.loadRelatedDepartments();
  //         // this.displayHijriDateInItsFormat(this.profile.birthDateInHijri);
  //         this.getUserImage(this.profile.userImagePath);
  //         if(this.profile.cvPath == ""){
  //           this.fileSize = 0;
  //           this.errorMessage = 'لا توجد سيرة ذاتية تم اختيارها';
  //         }else{
  //           this.getUserCvFile(this.profile.cvPath);
  //         }
  //         // this.fileName = this.profile.cvPath;
  //         // alert(this.fileName);
  //         // this.userProfileImage = this.profile.userImagePath;
  //         // alert(this.userProfileImage);
  //       }else{
  //         this.adminService.toastService.error(res.message);
  //       }
  //     },error:(error)=>{
  //       let errorMessage = 'حدث خطأ غير متوقع';
  //       if (error.error && typeof error.error === 'string') {
  //         errorMessage = error.error; // Use the error message from the 'error' property
  //       } else if (error.message) {
  //         errorMessage = error.message; // Use the 'message' property if available
  //       }
  //       this.adminService.toastService.error(errorMessage);
  //     }
  //   });
  // }
  loadProfile() {
    let _email = this.memberEmail;
    let model = {"email":_email};
    console.log(model);

    this.service.profileService.getUserProfileByEmail(model).subscribe({
      next: (res: ResponseVM) => {
        if (res.statusCode === 200) {
          this.profile = res.data as IProfile;
          this.profileId=res.data.email;
          if (this.profile.birthDateInAD) {
            this.profile.birthDateInAD = this.profile.birthDateInAD.split('T')[0];
          }
          if (this.profile.birthDateInHijri) {
            this.profile.birthDateInHijri = this.profile.birthDateInHijri.split('T')[0];
          }
          this.resetPasswordForm = this.service.formBuilder.group({
            email: [this.profileId, [Validators.required]]
          });
          this.initializeProfileData();
        } else {
          this.adminService.toastService.error(res.message);
        }
      },
      error: (error) => {
        const errorMessage = error.error && typeof error.error === 'string' ? error.error : error.message || 'Unexpected error occurred';
        this.adminService.toastService.error(errorMessage);
      }
    });
  }
  initializeProfileData() {
    this.loadCountries();
    this.loadAllCategories();
    //this.loadAllCitiesRelated(this.profile.countryId);
    //this.loadAllDistrictRelated(this.profile.cityId);
    this.loadFamilyBranches();
    this.loadDistinguishedTypes();
    this.loadWorkTypes();
    this.loadQualifications();
    this.loadRelatedSpecializations(this.profile.specializationId);
    this.loadRelatedDepartments();
    this.getUserImage(this.profile.userImagePath);

    if (this.profile.cvPath) {
      this.getUserCvFile(this.profile.cvPath);
    } else {
      this.fileSize = 0;
      this.errorMessage = 'No CV selected';
    }
  }

  back(){
    this.service.back;
  }
  padZeroes(number:any):any {
    return number < 10 ? '0' + number : number;
}
//   SaveData(){
//     const idNumberPattern = /^\d{10}$/;
//     console.log(this.profile);
//     if(this.profile.identityNumber == '' || this.profile.identityNumber == null){
//       this.adminService.toastService.error('يجب ادخال رقم الهوية');
//     }else if (!idNumberPattern.test(this.profile.identityNumber)) {
//       this.adminService.toastService.error('يجب أن يحتوي رقم الهوية على 10 أرقام موجبة ');
//     }
//     else{
//     if(this.profile.departmentId != 0){
//       if(this.profile.distinguishedTypeId != 0){
//         if(this.profile.qualificationId != 0){
//           if(this.profile.workTypeId != 0){
//             this.formData2 = new FormData();
//     this.formData2.append('email',this.profile.email);
//     this.formData2.append('phoneNumber',this.profile.phoneNumber);
//     this.formData2.append('password',this.profile.password);
//     // this.formData2.append('isApproved',this.profile.isApproved);
//     this.formData2.append('displayName',this.profile.displayName);
//     this.formData2.append('firstName',this.profile.firstName);
//     this.formData2.append('middleName',this.profile.middleName);
//     this.formData2.append('lastName',this.profile.lastName);
//     this.formData2.append('gender',this.profile.gender);
//     this.formData2.append('identityNumber',this.profile.identityNumber);
//     this.formData2.append('birthDateInHijri',this.profile.birthDateInHijri);

//     this.convertedDate=this.profile.birthDateInAD;
//     let date=new Date(this.convertedDate);
//     const formattedDate = `${date.getFullYear()}-${this.padZeroes(date.getMonth() + 1)}-${this.padZeroes(date.getDate())}`;

//     this.formData2.append('birthDateInAD',formattedDate);
//     this.formData2.append('countryId',this.profile.countryId.toString());
//     this.formData2.append('cityId',this.profile.cityId.toString());
//     this.formData2.append('districtId',this.profile.districtId.toString());
//     this.formData2.append('familyBranchId',this.profile.familyBranchId.toString());
//     this.formData2.append('maritalStatus',this.profile.maritalStatus);
//     this.formData2.append('isAvailableToWork',this.profile.isAvailableToWork);
//     this.formData2.append('isBusinessOwner',this.profile.isBusinessOwner);
//     this.formData2.append('qualificationId',this.profile.qualificationId.toString());
//     this.formData2.append('specializationId',this.profile.specializationId.toString());
//     this.formData2.append('departmentId',this.profile.departmentId.toString());
//     this.formData2.append('workTypeId',this.profile.workTypeId.toString());
//     this.formData2.append('hoppies',this.profile.hoppies);
//     this.formData2.append('distinguishedTypeId',this.profile.distinguishedTypeId.toString());
//     this.formData2.append('twitterLink',this.profile.twitterLink);
//     this.formData2.append('facebookLink',this.profile.facebookLink);
//     this.formData2.append('nickName',this.profile.nickName);
//     this.formData2.append('experience',this.profile.experience);
//     this.service.profileService.editUserProfile(this.formData2).subscribe({
//       next:(res:ResponseVM)=>{


//             if(res.statusCode==200){
//               this.adminService.toastService.success(res.message);
//               this.service.router.navigate(['/kafaat']);
//             }else{
//               this.adminService.toastService.warning(res.message);
//             }
//           },error:(error)=>{
//             let errorMessage = 'حدث خطأ غير متوقع';
//             if (error.error && typeof error.error === 'string') {
//               errorMessage = error.error; // Use the error message from the 'error' property
//             } else if (error.message) {
//               errorMessage = error.message; // Use the 'message' property if available
//             }
//             this.adminService.toastService.error(errorMessage);
//           }
//     })
//           }
//           else{
//             this.adminService.toastService.error('يجب ادخال نوع العمل');
//           }
//   }
//   else{
//     this.adminService.toastService.error('يجب ادخال المؤهل');
//   }
// }

//     else{
//       this.adminService.toastService.error('يجب ادخال وجه التميز');
//     }
//   }
//   else{
//     this.adminService.toastService.error('يجب ادخال القسم');
//   }
//   }

//   }
SaveData() {
  if (!this.validateProfileData()) return;

  const formData = this.constructFormData();
  this.service.profileService.editUserProfile(formData).subscribe({
    next: (res: ResponseVM) => {
      res.statusCode === 200 ? this.adminService.toastService.success(res.message) : this.adminService.toastService.warning(res.message);
      this.closeDialog();
      this.service.router.navigate(['/admin/members']);
    },
    error: (error) => {
      const errorMessage = error.error && typeof error.error === 'string' ? error.error : error.message || 'Unexpected error occurred';
      this.adminService.toastService.error(errorMessage);
    }
  });
}

validateProfileData(): boolean {
  const idNumberPattern = /^\d{10}$/;

  if (!this.profile.identityNumber) {
    this.adminService.toastService.error('رقم الهوية مطلوب');
    return false;
  }

  if (!idNumberPattern.test(this.profile.identityNumber)) {
    this.adminService.toastService.error('رقم الهوية يجب ان يكون 10 ارقام');
    return false;
  }



  return true;
}

resetPasswrd(){
  this.service.authService.resetpassword(this.resetPasswordForm.value).subscribe({
    next:res=>{
      if(res.statusCode==200){
        this.adminService.toastService.success(res.message);
        this.closeDialog()
      }
      else{
        this.adminService.toastService.error(res.message);
      }

    }
  })
}
constructFormData(): FormData {
  // const currentUser = this.service.authService.currentUser();
  // const model = { email: currentUser.id };
  const formData = new FormData();
  const formattedDate = new Date(this.profile.birthDateInAD).toISOString().split('T')[0];
  formData.append('id', this.profile.id);
  formData.append('email', this.profile.email);
  formData.append('phoneNumber', this.profile.phoneNumber);
  formData.append('password', this.profile.password);
  formData.append('displayName', this.profile.displayName);
  formData.append('firstName', this.profile.firstName);
  formData.append('userCategoryId',this.profile.userCategoryId.toString());
  formData.append('middleName', this.profile.middleName);
  formData.append('lastName', this.profile.lastName);
  formData.append('gender', this.profile.gender);
  formData.append('identityNumber', this.profile.identityNumber);
  formData.append('birthDateInHijri', this.profile.birthDateInHijri);
  formData.append('birthDateInAD', formattedDate);
  formData.append('countryId', this.profile.countryId.toString());
  formData.append('cityId', this.profile.cityId.toString());
  formData.append('districtId', this.profile.districtId.toString());
  formData.append('familyBranchId', this.profile.familyBranchId.toString());
  formData.append('maritalStatus', this.profile.maritalStatus);
  formData.append('isAvailableToWork', this.profile.isAvailableToWork);
  formData.append('isBusinessOwner', this.profile.isBusinessOwner);
  formData.append('qualificationId', this.profile.qualificationId.toString());
  if(this.profile.qualificationId==10013 || this.profile.qualificationId==10014){
    console.log('دخل');

    formData.append('departmentId', '39');
    formData.append('specializationId', '276');
  }else{
    formData.append('specializationId', this.profile.specializationId.toString());
    formData.append('departmentId', this.profile.departmentId.toString());
  }
  // formData.append('specializationId', this.profile.specializationId.toString());
  // formData.append('departmentId', this.profile.departmentId.toString());
  formData.append('workTypeId', this.profile.workTypeId.toString());
  formData.append('hoppies', this.profile.hoppies);
  formData.append('distinguishedTypeId', this.profile.distinguishedTypeId.toString());
  formData.append('twitterLink', this.profile.twitterLink);
  formData.append('facebookLink', this.profile.facebookLink);
  formData.append('nickName', this.profile.nickName);
  formData.append('experience', this.profile.experience);

  return formData;
}


  EditField(fieldName:string){

  }
  getUserImage(img:any){
    if(img.includes("assets/male.png")){
      this.userProfileImage = '/assets/images/male.png'
    }else if(img.includes("assets/female.png")){
      this.userProfileImage= '/assets/images/female.png'
    }
    else{
      this.userProfileImage = img;
    }
  }
  getUserCvFile(cv:any){
    this.isNewSelectedFile = false;
    this.fileSize = 999;
    this.errorMessage = '';
    this.fileName = "السيرة الذاتية للعضو " + this.profile.firstName;
    this.userCvFile = cv;
  }
  showCV(){
    const cvFileName = this.profile.cvPath;
    if(cvFileName.toLowerCase().includes('.pdf')){
      this.showPDFCv(cvFileName);
    }else{
      this.showImageCv(cvFileName);
    }
  }
  showPDFCv(cv:any){
    this.service.dialog.open(PdfPopupComponent,{
      width:'75%',
      height:'90%',
      data:{
        cvPdf:cv,
      }
    })
  }
  showImageCv(cv:any){
    const dialogRef = this.service.dialog.open(CvImagePopupComponent, {
      // width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
      width:'75%',
      height:'90%',
      data:{
        cvImage:cv,
      }
    })
  }

  displayHijriDateInItsFormat(bithDateinAd:any){
    this.profile.birthDateInHijri = this.transformDateToArabic(bithDateinAd);
    // alert(this.profile.birthDateInHijri);
  }
  transformDateToArabic(date: string): string {
    date = date.slice(0,10);
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    const transformedDate = date.replace(/\d/g, (digit) => {
      return arabicDigits[parseInt(digit)];
    });
    let newTransformedDate = transformedDate.split('-');
    return `${newTransformedDate[0]}/${newTransformedDate[1]}/${newTransformedDate[2]}`;
  }

  loadPDF(): void {
    const pdfUrl = '';
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((data) => {
      // Handle the PDF file data here, e.g., display it in an iframe or download it.
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url); // Opens the PDF in a new tab
    });
  }

  // onChangeDate(event:any){
  //   console.log(this.profile.birthDateInAD);

  //   if(event.value != null){
  //   const futureDate = event.value;
  //   console.log(event.value);

  //   // .format('YYYY-MM-DD');
  //   const y = futureDate.getFullYear();
  //   const d = futureDate.getDate();
  //   const m = futureDate.getMonth() + 1;

  //   const julianDay = this.gregorianToJulian(y, m, d);
  //   const { year, month, day } = this.julianToHijri(julianDay);

  //   this.profile.birthDateInHijri=`${year}-${month}-${day}`;

  //   console.log(this.profile.birthDateInHijri);

  //   let _m = month>9?`${month}`:`0${month}`;//1416-08-31 21:54:51.0000000
  //   let _d = day>9?`${day}`:`0${day}`;
  //   const updatedHijryDate = `${year}-${_m}-${_d} 00:00:00.0000000`;
  //   this.birthDateObj = {hijry: new Date(updatedHijryDate) ,milady:this.profile.birthDateInAD};
  //   //this.displayHijriDateInItsFormat(this.profile.birthDateInHijri);
  //   // let birthHijry = new Date(updatedHijryDate).toISOString();
  //   // this.profile.birthDateInHijri = birthHijry;

  //   // let arDate = this.transformDateToArabic(birthHijry);
  //   // this.birthDateInHijri.setValue(arDate);
  //   // this.profile.birthDateInHijri = arDate;
  //   console.log(this.profile.birthDateInHijri);
  //   }
  //    //this.editBirthDate();
  // }
  onChangeDate(event: any) {
    const inputDate = event.target.value;

    // Create a date object from the input value
    const futureDate = new Date(inputDate);

    // Adjust to UTC to avoid timezone issues
    const y = futureDate.getUTCFullYear();
    const d = futureDate.getUTCDate();
    const m = futureDate.getUTCMonth() + 1;

    const julianDay = this.gregorianToJulian(y, m, d);
    const { year, month, day } = this.julianToHijri(julianDay);

    this.profile.birthDateInHijri = `${year}-${this.padZeroes(month)}-${this.padZeroes(day)}`;
    this.cdr.detectChanges();
  }

   hijriToJulian = (year:any, month:any, day:any) => {
    return (
      Math.floor((11 * year + 3) / 30) +
      Math.floor(354 * year) +
      Math.floor(30 * month) -
      Math.floor((month - 1) / 2) +
      day +
      1948440 -
      386
    );
  };

  //  gregorianToJulian = (year:any, month:any, day:any) => {
  //   if (month < 3) {
  //     year -= 1;
  //     month += 12;
  //   }

  //   const a = Math.floor(year / 100.0);
  //   const b = year === 1582 && (month > 10 || (month === 10 && day > 4))
  //       ? -10 :
  //       year === 1582 && month === 10
  //       ? 0 :
  //       year < 1583
  //       ? 0 :
  //       2 - a + Math.floor(a / 4.0);

  //   return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524;
  // };
  gregorianToJulian(year: number, month: number, day: number): number {
    if (month < 3) {
      year -= 1;
      month += 12;
    }

    const a = Math.floor(year / 100.0);
    const b = year === 1582 && (month > 10 || (month === 10 && day > 4)) ? -10 :
      year === 1582 && month === 10 ? 0 :
        year < 1583 ? 0 :
          2 - a + Math.floor(a / 4.0);

    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524;
  }
  //  julianToHijri = (julianDay:number) => {
  //   const y = 10631.0 / 30.0;
  //   const epochAstro = 1948084;
  //   const shift1 = 8.01 / 60.0;

  //    var z= julianDay - epochAstro;
  //   const cyc = Math.floor(z / 10631.0);
  //   z -= 10631 * cyc;
  //   const j = Math.floor((z - shift1) / y);
  //   z -= Math.floor(j * y + shift1);

  //   const year = 30 * cyc + j;
  //   let month = Math.floor((z + 28.5001) / 29.5);
  //   if (month === 13) {
  //     month = 12;
  //   }

  //   const day = z - Math.floor(29.5001 * month - 29);

  //   return { year: year, month: month, day: day };
  // };
  julianToHijri(julianDay: number): { year: number, month: number, day: number } {
    const y = 10631.0 / 30.0;
    const epochAstro = 1948084;
    const shift1 = 8.01 / 60.0;

    let z = julianDay - epochAstro;
    const cyc = Math.floor(z / 10631.0);
    z -= 10631 * cyc;
    const j = Math.floor((z - shift1) / y);
    z -= Math.floor(j * y + shift1);

    const year = 30 * cyc + j;
    let month = Math.floor((z + 28.5001) / 29.5);
    if (month === 13) month = 12;

    const day = z - Math.floor(29.5001 * month - 29);

    return { year, month, day };
  }
  //  julianToGregorian = (julianDate:any) => {
  //   let b = 0;
  //   if (julianDate > 2299160) {
  //     const a = Math.floor((julianDate - 1867216.25) / 36524.25);
  //     b = 1 + a - Math.floor(a / 4.0);
  //   }

  //   const bb = julianDate + b + 1524;
  //   let cc = Math.floor((bb - 122.1) / 365.25);
  //   const dd = Math.floor(365.25 * cc);
  //   const ee = Math.floor((bb - dd) / 30.6001);

  //   const day = bb - dd - Math.floor(30.6001 * ee);
  //   let month = ee - 1;

  //   if (ee > 13) {
  //     cc += 1;
  //     month = ee - 13;
  //   }

  //   const year = cc - 4716;

  //   return { year: (year), month: (month), day: (day) };
  // };


  // editBirthDate(){
  //   let _userEmail = this.service.authService.currentUser().email;
  //   let model = {email: _userEmail ,birthDateInHijri: this.birthDateObj.hijry ,birthDateInAD : this.birthDateObj.milady};
  //   this.service.profileService.editProfileBirthDate(model).subscribe({
  //     next:(res:ResponseVM)=>{
  //       if(res.statusCode==200){
  //         this.adminService.toastService.success(res.message);


  //       }else{
  //         this.adminService.toastService.warning(res.message);
  //       }
  //     },error:(error)=>{
  //       let errorMessage = 'حدث خطأ غير متوقع';
  //       if (error.error && typeof error.error === 'string') {
  //         errorMessage = error.error; // Use the error message from the 'error' property
  //       } else if (error.message) {
  //         errorMessage = error.message; // Use the 'message' property if available
  //       }
  //       this.adminService.toastService.error(errorMessage);
  //     }
  //   });
  // }

  openchange(){
    const dialogRef = this.service.dialog.open(ChangePasswordMembersComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'50vh',
      data:this.profileId,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.closeDialog()
    });
  }
}
