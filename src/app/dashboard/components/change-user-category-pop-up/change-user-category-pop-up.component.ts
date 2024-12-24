import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-change-user-category-pop-up',
  templateUrl: './change-user-category-pop-up.component.html',
  styleUrls: ['../add-country/add-country.component.css','./change-user-category-pop-up.component.css']
})
export class ChangeUserCategoryPopUpComponent  implements OnInit {
  form:FormGroup = new FormGroup({});
  subItems:any;

  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<ChangeUserCategoryPopUpComponent>,@Inject(MAT_DIALOG_DATA) public data: any){ 
  }
  ngOnInit(): void {
    this.createForm();
    this.getSubItems();
    this.userId.setValue(this.data.email);
    this.getUserCategory();
    this.userCategoryId.setValue(this.data.userCategoryId);
  }
  getSubItems(){
    this.service.userCategoryService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.subItems = res.data;
        }else{
          this.service.toastService.error(res.message);
        }
      }
    })
  }
  getUserCategory(){
    this.service.membersService.getUserCategory(this.data.email).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.userCategoryId.setValue(res.data);
        }else{
          this.service.toastService.error(res.message);
        }
      }
    })
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      userId:['',[Validators.required]],
      userCategoryId:[0,[Validators.required,Validators.min(1)]],
    });
  }
  get userId(){
    return this.form.controls['userId'];
  }
  get userCategoryId(){
    return this.form.controls['userCategoryId'];
  }
  submit() {
    // this.service.printFormValues(this.form);
    if(this.form.valid){
      this.service.membersService.changeUserCategory(this.form.value).subscribe({
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
