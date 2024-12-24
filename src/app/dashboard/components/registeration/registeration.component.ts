import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { PdfViewrComponent } from 'src/app/kafaat/components/pdf-viewr/pdf-viewr.component';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { CvImagePopupComponent } from 'src/app/shared/components/cv-image-popup/cv-image-popup.component';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit , AfterViewInit{
  isNextPageVisible:boolean = true;
  isPasswordVisible:boolean = false;
  isPasswordVisible2:boolean = false;
  isDateChanged:boolean = false;
  isAvailableToWorkChecked:boolean = false;
  form:FormGroup = new FormGroup({});
  formData:FormData = new FormData();
  cv_file:any = "";
  categories:any[]=[];
  user_Image:any = "";
  fileName:string="";
  fileSize:number=0;
  errorMessage:string = "";
  originalPassword: string = '';
  countries:any[]=[];
  cities:any[]=[];
  districts:any[]=[];
  familyBranches:any[]=[];
  departments:any[]=[];
  qualifications:any[]=[];
  specializations:any[]=[];
  workTypes:any[]=[];
  distinguishedTypes:any[]=[];
  userProfileImage:string = '/assets/images/male.png';
  birthDateObj:any = {hijry:'',milady:''};
  birthDateInHijriValue=''
  image: any;

   constructor(private service:KafaatMainService,private adminService:MainDashoardService,
    private dateProvider:DateAdapter<Date>,private jak:NgxMatDateAdapter<Date>){
      // dateProvider.setLocale('ar-eg')
      jak.setLocale('ar-sa')
  }
  ngAfterViewInit(): void {
    this.handleOriginalValue(this.form.controls['password'].value);
  }
  ngOnInit(): void {
    this.createForm();
    this.loadCountries();
    this.loadAllCategories();
    this.loadFamilyBranches();
    this.loadWorkTypes();
    this.loadQualifications();
    this.loadDepartments();
    this.loadDistinguishedTypes();

  }

  onChangeDate(evnt:any){
    this.isDateChanged = true;
    const futureDate = evnt.value;
    // .format('YYYY-MM-DD');
    const y = futureDate.getFullYear();
    const d = futureDate.getDate();
    const m = futureDate.getMonth() + 1;

    const julianDay = this.gregorianToJulian(y, m, d);
    const { year, month, day } = this.julianToHijri(julianDay);
    this.birthDateInHijriValue=`${year}-${month}-${day}`;

    let _m = month>9?`${month}`:`0${month}`;//1416-08-31 21:54:51.0000000
    let _d = day>9?`${day}`:`0${day}`;

    let _m2 = m>9?`${m}`:`0${m}`;//1416-08-31 21:54:51.0000000
    let _d2 = d>9?`${d}`:`0${d}`;
    const updatedMiladyDate = `${y}-${_m2}-${_d2} 00:00:00.0000000`;
    const updatedHijryDate = `${year}-${_m}-${_d} 00:00:00.0000000`;
    let birthHijry = new Date(updatedHijryDate).toISOString();
    this.birthDateObj = {hijry: birthHijry ,milady:updatedMiladyDate};
    this.displayHijriDateInItsFormat(this.birthDateObj.hijry);
    let arDate = this.transformDateToArabic(birthHijry);
    this.birthDateInHijri.setValue(arDate);
  }

  displayHijriDateInItsFormat(bithDateinAd:string){
    let arabicDate = this.transformDateToArabic(bithDateinAd);
    this.birthDateInHijriValue = arabicDate;
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

   gregorianToJulian = (year:any, month:any, day:any) => {
    if (month < 3) {
      year -= 1;
      month += 12;
    }

    const a = Math.floor(year / 100.0);
    const b = year === 1582 && (month > 10 || (month === 10 && day > 4))
        ? -10 :
        year === 1582 && month === 10
        ? 0 :
        year < 1583
        ? 0 :
        2 - a + Math.floor(a / 4.0);

    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524;
  };

   julianToHijri = (julianDay:number) => {
    const y = 10631.0 / 30.0;
    const epochAstro = 1948084;
    const shift1 = 8.01 / 60.0;

     var z= julianDay - epochAstro;
    const cyc = Math.floor(z / 10631.0);
    z -= 10631 * cyc;
    const j = Math.floor((z - shift1) / y);
    z -= Math.floor(j * y + shift1);

    const year = 30 * cyc + j;
    let month = Math.floor((z + 28.5001) / 29.5);
    if (month === 13) {
      month = 12;
    }

    const day = z - Math.floor(29.5001 * month - 29);

    return { year: year, month: month, day: day };
  };

   julianToGregorian = (julianDate:any) => {
    let b = 0;
    if (julianDate > 2299160) {
      const a = Math.floor((julianDate - 1867216.25) / 36524.25);
      b = 1 + a - Math.floor(a / 4.0);
    }

    const bb = julianDate + b + 1524;
    let cc = Math.floor((bb - 122.1) / 365.25);
    const dd = Math.floor(365.25 * cc);
    const ee = Math.floor((bb - dd) / 30.6001);

    const day = bb - dd - Math.floor(30.6001 * ee);
    let month = ee - 1;

    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }

    const year = cc - 4716;

    return { year: (year), month: (month), day: (day) };
  };

  changeGender(){
    let genderValue = this.gender.value;
    let userImageIsDefault = this.userProfileImage == '/assets/images/male.png' ||  this.userProfileImage == '/assets/images/female.png';
    if(genderValue=='m' && userImageIsDefault){
      this.userProfileImage = '/assets/images/male.png';
    }else if(genderValue=='f' && userImageIsDefault){
      this.userProfileImage = '/assets/images/female.png';
    }
  }
  changeAvailableToWorkValue() {
    this.isAvailableToWorkChecked = !this.isAvailableToWorkChecked;
    if (this.isAvailableToWork.value) {
      this.cvFile.setValidators([Validators.required]);
    } else {
      this.cvFile.clearValidators();
    }
    this.cvFile.updateValueAndValidity();
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
  loadCountries(){
    this.adminService.countryService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.countries = res.data
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
  loadQualifications(){
    this.adminService.qualificationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.qualifications = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadSpecializations(id:any){
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
  loadDepartments(){
    this.adminService.departmentService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.departments = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
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
  handleOriginalValue(originalText: string) {
    this.originalPassword = originalText;
  }

  createForm(){
    this.form = this.service.formBuilder.group({
      //id:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phoneNumber:['',[Validators.required]],
      userCategoryId:['',[Validators.required]],
      // password:['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      // confirmPassword:['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      password:['',[Validators.required,Validators.minLength(4)]],
      confirmPassword:['',[Validators.required]],
      isApproved:[false,[Validators.required]],
      displayName:['',[Validators.required]],
      firstName:['',[Validators.required]],
      middleName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      gender:[null,[Validators.required]],
      identityNumber:['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      birthDateInHijri:['',[Validators.required]],
      birthDateInAD:['',[Validators.required]],
      countryId:[null,[Validators.required]],
      cityId:[null,[Validators.required]],
      districtId:[null,[Validators.required]],
      familyBranchId:[null,[Validators.required]],
      maritalStatus:[null,[Validators.required]],
      isAvailableToWork:[true,[Validators.required]],
      isBusinessOwner:[false,[Validators.required]],
      qualificationId:[null,[Validators.required]],
      specializationId:[null,[Validators.required]],
      departmentId:[null,[Validators.required]],
      workTypeId:[3],
      hoppies:[''],
      distinguishedTypeId:[10015],
      twitterLink :[''],
      facebookLink :[''],
      nickName :['',[Validators.required]],
      experience :[null],
      cvFile:['',[]],
      userImage:['',[]],
    });
  }
  markFormAsTouched(){
    //this.form.controls['id'].markAsTouched();
    this.form.controls['email'].markAsTouched();
    this.form.controls['userCategoryId'].markAsTouched();
    this.form.controls['phoneNumber'].markAsTouched();
    this.form.controls['password'].markAsTouched();
    this.form.controls['confirmPassword'].markAsTouched();
    this.form.controls['isApproved'].markAsTouched();
    this.form.controls['displayName'].markAsTouched();
    this.form.controls['firstName'].markAsTouched();
    this.form.controls['middleName'].markAsTouched();
    this.form.controls['lastName'].markAsTouched();
    this.form.controls['gender'].markAsTouched();
    this.form.controls['identityNumber'].markAsTouched();
    this.form.controls['birthDateInHijri'].markAsTouched();
    this.form.controls['birthDateInAD'].markAsTouched();
    this.form.controls['countryId'].markAsTouched();
    this.form.controls['cityId'].markAsTouched();
    this.form.controls['districtId'].markAsTouched();
    this.form.controls['familyBranchId'].markAsTouched();
    this.form.controls['maritalStatus'].markAsTouched();
    this.form.controls['isAvailableToWork'].markAsTouched();
    this.form.controls['isBusinessOwner'].markAsTouched();
    this.form.controls['qualificationId'].markAsTouched();
    this.form.controls['specializationId'].markAsTouched();
    this.form.controls['departmentId'].markAsTouched();
    this.form.controls['workTypeId'].markAsTouched();
    this.form.controls['hoppies'].markAsTouched();
    this.form.controls['distinguishedTypeId'].markAsTouched();
    this.form.controls['twitterLink'].markAsTouched();
    this.form.controls['facebookLink'].markAsTouched();
    this.form.controls['nickName'].markAsTouched();
    this.form.controls['experience'].markAsTouched();
  }
  onCvSelected(event: any) {
    event.preventDefault();
    this.errorMessage="";
    this.image = event.target.files[0];
     let checkResult = this.validateUplodedFile(this.image,true);
     if(checkResult!=''){
      this.errorMessage  = checkResult;
      return;
    }
    this.fileSize = this.image.size/(1024*1024);
    this.fileName = this.image.name;
     this.cv_file = URL.createObjectURL(this.image);
    console.log("+++++++++++++++++++++++++++++++++++++++++ "+this.image)
     this.formData.append('cvFile',this.image);
     console.log(this.formData.get('cvFile'));

  }
  onUserImageSelected(event: any) {
    event.preventDefault();
    const image = event.target.files[0];
     let checkResult = this.validateUplodedFile(image);
     if(checkResult!=''){
      this.adminService.toastService.warning(checkResult);
      return;
    }
    this.userProfileImage = URL.createObjectURL(image);
    //  this.form.controls['userImage'].setValue(image);
     this.formData.append('userImage',image);
     console.log(this.formData.get('userImage'));
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
  AppendFormToFormData(){
   // this.formData.append('id','');
    this.formData.append('email',this.email.value);
    this.formData.append('userCategoryId',this.userCategoryId.value);
    this.formData.append('phoneNumber',this.phoneNumber.value);
    this.formData.append('password',this.password.value);
    this.formData.append('isApproved',this.isApproved.value);
    this.formData.append('displayName',this.displayName.value);
    this.formData.append('firstName',this.firstName.value);
    this.formData.append('middleName',this.middleName.value);
    this.formData.append('lastName',this.lastName.value);
    this.formData.append('gender',this.gender.value);
    this.formData.append('identityNumber',this.identityNumber.value);
    this.formData.append('birthDateInHijri',this.birthDateInHijri.value);
    this.formData.append('birthDateInAD',this.birthDateInAD.value);
    this.formData.append('countryId',this.countryId.value);
    this.formData.append('cityId',this.cityId.value);
    this.formData.append('districtId',this.districtId.value);
    this.formData.append('familyBranchId',this.familyBranchId.value);
    this.formData.append('maritalStatus',this.maritalStatus.value);
    this.formData.append('isAvailableToWork',this.isAvailableToWork.value);
    this.formData.append('isBusinessOwner',this.isBusinessOwner.value);
    this.formData.append('qualificationId',this.qualificationId.value);
    this.formData.append('specializationId',this.specializationId.value);
    this.formData.append('departmentId',this.departmentId.value);
    this.formData.append('workTypeId',this.workTypeId.value);
    this.formData.append('hoppies',this.hoppies.value);
    this.formData.append('distinguishedTypeId',this.distinguishedTypeId.value);
    this.formData.append('twitterLink',this.twitterLink.value);
    this.formData.append('facebookLink',this.facebookLink.value);
    this.formData.append('nickName',this.nickName.value);
    this.formData.append('experience',this.experience.value);
    if(!this.formData.has('userImage')){
      this.formData.append('userImage','DEFAULT_IMAGE');
    }
    if(!this.formData.has('cvFile')){
      this.formData.append('cvFile','no File');
    }
  }
  _______setValuesToNullIfMemberNotAvailableToWork(){
    if(!this.isAvailableToWork.value){
      this.form.controls['qualificationId'].setValue(null);
      this.form.controls['specializationId'].setValue(null);
      this.form.controls['departmentId'].setValue(null);
      this.form.controls['workTypeId'].setValue(null);
      this.form.controls['hoppies'].setValue(null);
    }
  }
  submit() {
    this.formData=new FormData();
    if(this.isPasswordFieldsIdentical == false){
      return;
    }
    this.birthDateInHijri.setValue(this.birthDateObj.hijry);
    this.birthDateInAD.setValue(this.birthDateObj.milady);
    this.AppendFormToFormData();
    // this.setValuesToNullIfMemberNotAvailableToWork();
    // return;
    // this.service.printFormValues(this.form);

    // this.formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });



    Object.keys(this.form.controls).forEach(key => {
      const controlErrors = this.form.get(key)?.errors;
      if (controlErrors) {
        console.log(`${key} has errors:`, controlErrors);
      }
    });
    console.log(this.districtId.value);




    if(this.form.valid){
      this.service.profileService.register(this.formData).subscribe({
        next:(response:ResponseVM)=>{
          console.log(this.districtId.value);
          if(response.statusCode == 200){
            // this.service.toastService.success(response.message);
            this.service.router.navigate(['/admin/request-send-success']);
          }else{
            this.adminService.toastService.error(response.message);
            this.formData = new FormData();
            this.ngOnInit()
          }

        },
        error:(error)=>{
          let errorMessage = 'حدث خطأ غير متوقع';
          if (error.error && typeof error.error === 'string') {
            errorMessage = error.error; // Use the error message from the 'error' property
          } else if (error.message) {
            errorMessage = error.message; // Use the 'message' property if available
          }
          this.adminService.toastService.error(errorMessage);
        }
      })
   }
  }
  goToNext(){
    if(this.firstName.value != null && this.middleName.value != null &&
      this.lastName.value != null && this.gender.value != null && this.identityNumber.value != null
      && this.birthDateInAD.value != '' && this.countryId.value != null &&
      this.cityId.value != null && this.districtId.value != null  &&
      this.familyBranchId.value != null  &&
      this.specializationId.value != null && this.departmentId != null && this.qualificationId.value != null
    ){
      if(this.isAvailableToWork.value == true && !this.formData.has('cvFile')){
        this.errorMessage = "من فضلك قم بارفاق السيرة الذاتية";
        this.adminService.toastService.error(this.errorMessage);
      }else
    this.isNextPageVisible=!this.isNextPageVisible}
    else{
      this.adminService.toastService.error('من فضلك املاء جميع الحقول');
    }
  }
  back(){
    if(!this.isNextPageVisible){
      this.isNextPageVisible=!this.isNextPageVisible;
    }else{
      this.service.back;
    }
  }
  value1:any;
  isDate:boolean = true;
  pickBirthDataInMilady(event: any){
    event.target.value='12-12-2003';
    let originValues = event.target.value.split('-').reverse().join('-');
    console.log(originValues)
    this.value1 = originValues;
    return;
  }
  pickBirthDataInHijri(value: string){
    this.form.controls['birthDateHijry'].setValue(value);
  }

  get email(){
    return this.form.controls['email'];
  }
  get userCategoryId(){
    return this.form.controls['userCategoryId'];
  }
  get phoneNumber(){
    return this.form.controls['phoneNumber'];
  }
  get password(){
    return this.form.controls['password'];
  }
  get confirmPassword(){
    return this.form.controls['confirmPassword'];
  }
  get isApproved(){
    return this.form.controls['isApproved'];
  }
  get displayName(){
    return this.form.controls['displayName'];
  }
  get firstName(){
    return this.form.controls['firstName'];
  }
  get middleName(){
    return this.form.controls['middleName'];
  }
  get lastName(){
    return this.form.controls['lastName'];
  }
  get gender(){
    return this.form.controls['gender'];
  }
  get identityNumber(){
    return this.form.controls['identityNumber'];
  }
  get birthDateInHijri(){
    return this.form.controls['birthDateInHijri'];
  }
  get birthDateInAD(){
    return this.form.controls['birthDateInAD'];
  }
  get countryId(){
    return this.form.controls['countryId'];
  }
  get cityId(){
    return this.form.controls['cityId'];
  }
  get districtId(){
    return this.form.controls['districtId'];
  }
  get familyBranchId(){
    return this.form.controls['familyBranchId'];
  }
  get maritalStatus(){
    return this.form.controls['maritalStatus'];
  }
  get isAvailableToWork(){
    return this.form.controls['isAvailableToWork'];
  }
  get isBusinessOwner(){
    return this.form.controls['isBusinessOwner'];
  }
  get qualificationId(){
    return this.form.controls['qualificationId'];
  }
  get specializationId(){
    return this.form.controls['specializationId'];
  }
  get departmentId(){
    return this.form.controls['departmentId'];
  }
  get workTypeId(){
    return this.form.controls['workTypeId'];
  }
  get hoppies(){
    return this.form.controls['hoppies'];
  }
  get cvFile(){
    return this.form.controls['cvFile'];
  }
  get userImage(){
    return this.form.controls['userImage'];
  }
  get distinguishedTypeId(){
    return this.form.controls['distinguishedTypeId'];
  }
  get twitterLink(){
    return this.form.controls['twitterLink'];
  }
  get facebookLink(){
    return this.form.controls['facebookLink'];
  }
  get nickName(){
    return this.form.controls['nickName'];
  }
  get experience(){
    return this.form.controls['experience'];
  }
  get isPasswordFieldsIdentical():boolean{
    return this.password.value == this.confirmPassword.value;
  }

  changeCountry(){
    let id = this.countryId.value;
    this.loadCities(id);
    const countryCodes: { [key: number]: string } = {
      2: '966',
      10003: '965',
      10002: '973'

    };
        // Update phone number field based on the selected country
        const phoneNumberControl = this.form.get('phoneNumber');
        if (countryCodes[id]) {
          // Set default value with country code
          phoneNumberControl?.setValue(countryCodes[id]);
          phoneNumberControl?.setValidators([Validators.required, Validators.pattern(`^${countryCodes[id]}\\d*$`)]);
        } else {
          // Clear phone number validation if another country is selected
          phoneNumberControl?.clearValidators();
          phoneNumberControl?.setValue('');
        }

        // Trigger validation
        this.form.get('phoneNumber')?.updateValueAndValidity();
  }
  getPhoneNumberErrorMessage(): string {
    const phoneNumberControl = this.form.get('phoneNumber');
    if (phoneNumberControl?.hasError('required')) {
      return 'حقل رقم الجوال مطلوب';
    } else if (phoneNumberControl?.hasError('pattern')) {
      let id = this.countryId.value;
      const countryCodes: { [key: number]: string } = {
        2: '966',
        10003: '965',
        10002: '973'
      };
      const countryCode = countryCodes[id] || '';
      return `يجب أن يبدأ رقم الجوال بـ ${countryCode}`;
    }
    return '';
  }
  changeCity(){
    let id = this.cityId.value;
    this.loadDistricts(id);
    console.log(this.districtId.value);
  }

  // changeQualification(){
  //   let id = this.qualificationId.value;
  //   this.loadDepartments(id);
  // }
  changeQualification() {
    const selectedQualificationId = this.qualificationId.value;
    console.log(selectedQualificationId);
    if (selectedQualificationId == 10013 || selectedQualificationId == 10014) {

        this.form.get('departmentId')?.disable();
        this.form.get('departmentId')?.setValue(39);
        this.form.get('specializationId')?.disable();
        this.form.get('specializationId')?.setValue(276);

    } else {

        this.form.get('departmentId')?.enable();
        this.form.get('departmentId')?.setValue(null);

        this.form.get('specializationId')?.enable();
        this.form.get('specializationId')?.setValue(null);
  }
}

  changeDepartment(){
    let id = this.departmentId.value;
    this.loadSpecializations(id);
  }


  showCV(){
    const cvFileName = this.cv_file;
    // const cvFileName = this.userProfileImage;
    if(this.fileName.toLowerCase().includes('.pdf')){
      this.showPDFCv(cvFileName);
    }else{
      this.showImageCv(cvFileName);
    }
  }
  showPDFCv(cv:any){
    this.service.dialog.open(PdfViewrComponent,{
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
}
