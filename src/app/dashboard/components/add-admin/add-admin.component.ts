import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<AddAdminComponent>){}
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      email: ['',[Validators.required]],
      displayName: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.minLength(4)]]
    });
  }

  get email(){
    return this.form.controls['email'];
  }
  get displayName(){
    return this.form.controls['displayName'];
  }
  get phoneNumber(){
    return this.form.controls['phoneNumber'];
  }
  get password(){
    return this.form.controls['password'];
  }
  submit() {
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }
    if(this.form.valid){
      this.service.accountService.addAdmin(this.form.value).subscribe({
        next:(response:ResponseVM)=>{
          if(response.statusCode==200){
            this.service.toastService.success(response.message);
            this.closeDialog();
          }else{
            this.service.toastService.error(response.message);
          }
        },
        error:(error)=>{
          this.service.toastService.error(error);
        }
      })
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
