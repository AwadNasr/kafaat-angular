import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { ResponseVM } from '../../core/models/response-vm';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../profile-layout/profile-layout.component.css','../profile-account-information/profile-account-information.component.css','../registeration/registeration.component.css','./login.component.css']
})
export class LoginComponent implements OnInit {
  isPasswordVisible:boolean = false;
  form:FormGroup = new FormGroup({});
  constructor(private service:KafaatMainService,private adminService:MainDashoardService) {}
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }
  get email(){
    return this.form.controls['email'];
  }
  get password(){
    return this.form.controls['password'];
  }
  submit() {
    //  this.service.printFormValues(this.form);
    if(this.form.valid){
      this.service.authService.login(this.form.value);
    }
  }
  back(){
    this.service.router.navigate(['/'], { replaceUrl: true });
  }

}
