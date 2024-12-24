import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';

@Component({
  selector: 'app-contact-us-add-or-update-response-pop-up',
  templateUrl: './contact-us-add-or-update-response-pop-up.component.html',
  styleUrls: ['./contact-us-add-or-update-response-pop-up.component.css']
})
export class ContactUsAddOrUpdateResponsePopUpComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  userMessage:string='msg';
  isDisabled:boolean = false;
  titleHeader:any;
  msg:string=''
  constructor(private service:KafaatMainService,private adminService:MainDashoardService,private dialogRef: MatDialogRef<ContactUsAddOrUpdateResponsePopUpComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
    if(!this.data.hasOwnProperty('id')){
      this.msg=this.data.message
    }
console.log(this.msg);


  }
  ngOnInit(): void {
    this.createForm();
    this.titleHeader=this.data.label;
    this.userMessage=this.data.message;
    this.responseMessage.setValue(this.data.responseMessage);
    this.isDisabled = this.data.is_responseMessage_control_Disabled;
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      id:['',[Validators.required]],
      responseMessage:['',[Validators.required]],
    });
  }
  get responseMessage(){
    return this.form.controls['responseMessage'];
  }
  get id(){
    return this.form.controls['id'];
  }
  submit() {
    this.id.setValue(`${this.data.id}`);
    if(this.form.valid){
      this.service.contactUsService.addOrUpdateResponse(this.form.value).subscribe({
        next:(response:ResponseVM)=>{
          if(response.statusCode==200){
            this.adminService.toastService.success(response.message);
          }else{
            this.adminService.toastService.error(response.message);
          }
          this.closeDialog();
        },
        error:(error)=>{
          this.adminService.toastService.error(error);
          this.closeDialog();
        }
      })
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
