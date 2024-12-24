import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from '../../core/models/response-vm';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['../profile-layout/profile-layout.component.css','../profile-account-information/profile-account-information.component.css','../registeration/registeration.component.css','../login/login.component.css','./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  isPasswordVisible:boolean = false;
  isPasswordVisible2:boolean = false;
  userEmail:string = '';
  form:FormGroup = new FormGroup({});
  constructor(private service:KafaatMainService,private adminService:MainDashoardService) {}
  ngOnInit(): void {
    this.createForm();
    this.getForgetEmailFromObserver();
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      newPassword:['',[Validators.required,Validators.minLength(4)]],
      confirmPassword:['',[Validators.required,Validators.minLength(4)]],
      email:['',[]],
    });
  }
  getForgetEmailFromObserver(){
    this.userEmail = this.service.authSharedService.getForgetEmail() ?? '';
  }
  get newPassword(){
    return this.form.controls['newPassword'];
  }
  get confirmPassword(){
    return this.form.controls['confirmPassword'];
  }
  get email(){
    return this.form.controls['email'];
  }
  get isPasswordFieldsIdentical():boolean{
    return this.newPassword.value == this.confirmPassword.value;
  }
  submit() {
    //  this.service.printFormValues(this.form);
    this.getForgetEmailFromObserver();
    this.email.setValue(this.userEmail);
    if(this.form.valid){
      this.form.removeControl('confirmPassword');
      this.service.authService.createNewPassword(this.form.value).subscribe({
        next:(response:ResponseVM)=>{
          if(response.statusCode==200){
                this.adminService.router.navigate(['/']).then(val=>{
                this.adminService.toastService.success(response.message);
              });
          }else{
            this.adminService.toastService.error(response.message);
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
  back(){
    this.service.back;
  }

}
