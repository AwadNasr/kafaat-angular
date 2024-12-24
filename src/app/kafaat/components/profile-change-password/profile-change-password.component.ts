import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from '../../core/models/response-vm';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['../profile-layout/profile-layout.component.css','./profile-change-password.component.css'],
})
export class ProfileChangePasswordComponent  implements OnInit {
  form:FormGroup = new FormGroup({});
  
  
  constructor(private service:KafaatMainService,private adminService:MainDashoardService){}

  ngOnInit(): void {
    this.createForm();
  }
  @Output() valueEmitted:EventEmitter<boolean>  = new EventEmitter<boolean>();
  changePage():void{
    this.valueEmitted.emit(false);
  }

  createForm(){
    this.form = this.service.formBuilder.group({
      email:['',[Validators.required]],
      oldPassword:['',[Validators.required]],
      newPassword:['',[Validators.required,Validators.minLength(4)]],
      confirmPassword:['',[Validators.required,Validators.minLength(4)]],
    });
  }
  get isPasswordFieldsIdentical():boolean{
    return this.newPassword.value == this.confirmPassword.value;
  }
  submit() {
    // this.service.printFormValues(this.form);
    let _email = this.service.authService.currentUser().email;
    this.form.controls['email'].setValue(_email);
    if(this.form.valid && this.isPasswordFieldsIdentical){
      this.form.removeControl('confirmPassword');
      this.service.profileService.changePassword(this.form.value).subscribe({
        next:(res:ResponseVM)=>{
          if (res.statusCode == 200) {
            if (res.data) {
              this.adminService.toastService.success(res.message);
            } 
            else {
              this.adminService.toastService.warning(res.message);
            }
          } 
          else {
            this.adminService.toastService.error(res.message);
          }
          this.changePage();
        },error:(error)=>{
          let errorMessage = 'حدث خطأ غير متوقع';
          if (error.error && typeof error.error === 'string') {
            errorMessage = error.error; // Use the error message from the 'error' property
          } else if (error.message) {
            errorMessage = error.message; // Use the 'message' property if available
          }
          this.adminService.toastService.error(errorMessage);
          this.changePage();
        }
      });
    }
  }
  
  passwordValidityResult:string='';
  isPasswodValid:boolean=false;
  checkPasswordValidity(){
    let userId = this.service.authService.currentUser().id;
    let model = {UserId:userId,Password:this.oldPassword.value};
    if(this.oldPassword.value.length>0)
    this.service.profileService.IsPasswordValid(model).subscribe({
      next:(res:ResponseVM)=>{
        if (res.statusCode == 200) {
          this.isPasswodValid = res.data;
          this.passwordValidityResult = res.message;
        } 
      },error:(error)=>{
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Use the error message from the 'error' property
        } else if (error.message) {
          errorMessage = error.message; // Use the 'message' property if available
        }
      }
    });
  }
  
  get oldPassword(){
    return this.form.controls['oldPassword'];
  }
  get newPassword(){
    return this.form.controls['newPassword'];
  }
  get confirmPassword(){
    return this.form.controls['confirmPassword'];
  }
  back(){
    this.service.back;
  } 
}
