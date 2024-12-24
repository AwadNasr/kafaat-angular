import { Component, OnInit } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { FormGroup, Validators } from '@angular/forms';
import { ResponseVM } from '../../core/models/response-vm';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['../profile-layout/profile-layout.component.css', '../profile-account-information/profile-account-information.component.css', '../registeration/registeration.component.css', '../login/login.component.css', './forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(private service: KafaatMainService,private router: Router, private adminService: MainDashoardService) { }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.service.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }
  get email() {
    return this.form.controls['email'];
  }
  submit() {
    //  this.service.printFormValues(this.form);

    // this.service.router.navigate(['/code-auth']);
    // this.service.authSharedService.setForgerEmail(response.data.email);

    if (this.form.valid) {
      this.service.authService.forgetPassword(this.email.value).subscribe({
        next: (response: ResponseVM) => {
          if (response.statusCode == 200) {
            console.log(response.data);
            
            this.adminService.toastService.success(response.message);
            this.service.authSharedService.setForgetEmail(response.data.email);
            this.service.router.navigate(['/code-auth']);
          } else {
            this.adminService.toastService.error(response.message);
          }
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
  }
  back() {
    this.router.navigate(['/login']);
  }

}
