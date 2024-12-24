import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { ResponseVM } from '../../core/models/response-vm';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';

@Component({
  selector: 'app-code-auth',
  templateUrl: './code-auth.component.html',
  styleUrls: ['../profile-layout/profile-layout.component.css','../profile-account-information/profile-account-information.component.css','../registeration/registeration.component.css','../login/login.component.css','./code-auth.component.css']
})
export class CodeAuthComponent  implements OnInit {
  // form:FormGroup = new FormGroup({});
  verificationCode:any={n1:'',n2:'',n3:'',n4:''};
  errorCode:boolean=false;
  count:number = 60;
  isIn60SecondDularion:boolean=false;
  userEmail:string = 'email';
  isCounterTerminated:boolean = false;
  constructor(private service:KafaatMainService,private adminService:MainDashoardService) {
    this.verificationCode={n1:'',n2:'',n3:'',n4:''};
  }
  ngOnInit(): void {
    // this.createForm();
    this.getForgetEmailFromObserver();
    this.startCounterDown();
  }
  getForgetEmailFromObserver(){
    this.userEmail = this.service.authSharedService.getForgetEmail() ?? '';
  }
  startCounterDown() {
    this.count = 60;
    const countdown = setInterval(() => {
      // console.log(this.count);
      this.count--;
      if (this.count === 0) {
        clearInterval(countdown);
        this.isCounterTerminated  = true;
      }
    }, 1000);
  }

  // createForm(){
  //   this.form = this.service.formBuilder.group({
  //     code:['',[Validators.required]],
  //     email:[this.userEmail,[Validators.required]],
  //   });
  // }
  get code(){
    return `${this.verificationCode.n1}${this.verificationCode.n2}${this.verificationCode.n3}${this.verificationCode.n4}`;
  }
  get email(){
    return this.userEmail;
  }
  resendCode(){
    this.getForgetEmailFromObserver();
    this.service.authService.forgetPassword(this.userEmail).subscribe({
      next: (response: ResponseVM) => {
        if (response.statusCode == 200) {
          this.adminService.toastService.success(response.message);
        } else {
          this.adminService.toastService.error(response.message);
        }
        this.startCounterDown();
        this.isCounterTerminated = false;
        this.errorCode = false;
        this.verificationCode={n1:'',n2:'',n3:'',n4:''};
      },
      error: (error) => {
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Use the error message from the 'error' property
        } else if (error.message) {
          errorMessage = error.message; // Use the 'message' property if available
        }
        this.adminService.toastService.error(errorMessage);
      }
    });
  }
  submit() {
    this.getForgetEmailFromObserver();
    //  this.service.printFormValues(this.form);
    let objRequest = {code:this.code,email:this.email};
    if(objRequest.code != '' && objRequest.email != ''){
      this.service.authService.checkCode(objRequest).subscribe({
        next:(response:ResponseVM)=>{
          if(response.statusCode==200){
            if(response.data == true){
              this.adminService.toastService.success(response.message);
              this.adminService.router.navigate(['/change-password']);
            }else{
              // this.adminService.toastService.error(response.message);
              this.errorCode = true;
            }
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
