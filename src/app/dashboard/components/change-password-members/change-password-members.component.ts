import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-members',
  templateUrl: './change-password-members.component.html',
  styleUrls: ['./change-password-members.component.css']
})
export class ChangePasswordMembersComponent {
  form:FormGroup = new FormGroup({});
  
  email:string;
  constructor(private service:KafaatMainService,private adminService:MainDashoardService, @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ChangePasswordMembersComponent>){
this.email=data
console.log(this.email);

  }

  ngOnInit(): void {
    this.createForm();
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
    //let _email = this.service.authService.currentUser().email;
    this.form.controls['email'].setValue(this.email);
    if(this.form.valid && this.isPasswordFieldsIdentical){
      this.form.removeControl('confirmPassword');
      this.service.profileService.changePassword(this.form.value).subscribe({
        next:(res:ResponseVM)=>{
          if (res.statusCode == 200) {
            if (res.data) {
              this.closeDialog();
              this.adminService.toastService.success(res.message);
              
            } 
            else {
              this.adminService.toastService.warning(res.message);
            }
          } 
          else {
            this.adminService.toastService.error(res.message);
          }
         // this.changePage();
        },error:(error)=>{
          let errorMessage = 'حدث خطأ غير متوقع';
          if (error.error && typeof error.error === 'string') {
            errorMessage = error.error; // Use the error message from the 'error' property
          } else if (error.message) {
            errorMessage = error.message; // Use the 'message' property if available
          }
          this.adminService.toastService.error(errorMessage);
          //this.changePage();
        }
      });
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
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
