import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-send-email-pop-up',
  templateUrl: './send-email-pop-up.component.html',
  styleUrls: ['./send-email-pop-up.component.css']
})
export class SendEmailPopUpComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  email:string = '';
  constructor(private service:KafaatMainService,private adminService:MainDashoardService,private dialogRef: MatDialogRef<SendEmailPopUpComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
    this.createForm();
    this.email=this.data.email;
    this.id.setValue(this.data.id);
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      id:['',[Validators.required]],
      message:['',[Validators.required]],
      subject:['',[Validators.required]],
    });
  }
  get id(){
    return this.form.controls['id'];
  }
  get subject(){
    return this.form.controls['subject'];
  }
  get message(){
    return this.form.controls['message'];
  }
  submit() {
    this.id.setValue(`${this.data.id}`);

    if(this.form.valid){
      this.adminService.membersService.sendEmailToUser(this.form.value).subscribe({
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
