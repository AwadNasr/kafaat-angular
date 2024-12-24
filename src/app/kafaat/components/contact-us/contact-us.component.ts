import { Component, OnInit } from '@angular/core';
import { ContactInformationModel } from 'src/app/dashboard/core/models/contact-information-model';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from '../../core/models/response-vm';
import { FormGroup, Validators } from '@angular/forms';
import { KafaatMainService } from '../../services/kafaat-main.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  contactInformationItems:ContactInformationModel = {} as ContactInformationModel;
  constructor(private service:MainDashoardService,private kafaatService:KafaatMainService){}
  ngOnInit(): void {
    this.contactInformationItems.title = 'مؤسسة كفاءات الماجد ترحب بمقترحاتكم وآرائكم من خلال تعبئة هذا النموذج، سيصلكم الرد بعد الاطلاع على المكتوب ومعالجته';
    this.get();
    this.createForm();
  }

  get(){
    this.service.contactInformationService.get().subscribe({
      next:(res:ResponseVM)=>{
        if (res.statusCode == 200) {
          this.contactInformationItems = res.data;
        } 
        else {
          this.service.toastService.error(res.message);
        }
      },error:(error)=>{
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Use the error message from the 'error' property
        } else if (error.message) {
          errorMessage = error.message; // Use the 'message' property if available
        }
        this.service.toastService.error(errorMessage);
      }
    });
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
      this.kafaatService.contactUsService.sendMessage(this.form.value).subscribe({
        next:(response:ResponseVM)=>{
          if(response.statusCode==200){
            this.service.toastService.success(response.message);
          }else{
            this.service.toastService.error(response.message);
          }
          this.form.reset();
        },
        error:(error)=>{
          this.service.toastService.error(error);
          this.form.reset();
        }
      })
    }
  }
 
}
