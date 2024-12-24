import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['../../../kafaat/components/contact-us/contact-us.component.css','./form-contact.component.css']
})
export class FormContactComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  constructor(private service:KafaatMainService,private adminService:MainDashoardService){}
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      userName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      message:['',[Validators.required,Validators.maxLength(500)]],
    });
  }
  get userName(){
    return this.form.controls['userName'];
  }
  get email(){
    return this.form.controls['email'];
  }
  get message(){
    return this.form.controls['message'];
  }

  submit() {
    // this.service.printFormValues(this.form);
    this.userName.markAsTouched();
    this.email.markAsTouched();
    this.message.markAsTouched();
    if(this.form.valid){
      this.service.contactUsService.sendMessage(this.form.value).subscribe({
        next:(response:ResponseVM)=>{
          if(response.statusCode==200){
            this.service.toastService.success(response.message);
          }else{
            this.service.toastService.error(response.message);
          }
          this.form.reset();
        },
        error:(error)=>{
          this.adminService.toastService.error(error);
          this.form.reset();
        }
      });
    }
  }
}
