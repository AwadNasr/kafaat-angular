import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { catchError, throwError } from 'rxjs';
import { UserCategory } from '../../services/user-category.service';

@Component({
  selector: 'app-user-category-add',
  templateUrl: './user-category-add.component.html',
  styleUrls: ['./user-category-add.component.css']
})
export class UserCategoryAddComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,
    public dialogRef: MatDialogRef<UserCategoryAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private toastr: ToastrService) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    if(this.data.name){
    this.form = this.service.formBuilder.group({
      name:[this.data.name,[Validators.required]],
      description:[this.data.description,[Validators.required]],
    });
  }else{
    this.form = this.service.formBuilder.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
    });
  }
  }
  get name(){
    return this.form.controls['name'];
  }
  get description(){
    return this.form.controls['description'];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  submit(){
    this.dialogRef.close();
    if(this.data.name){
      this.service.userCategoryService.update({...this.form.value,"id":this.data.id}).pipe(
        catchError((error) => {
          console.error(error);
          this.toastr.error('افحص السرفر');
          return throwError(error);
        })
      ).subscribe(respone=>{
        if(respone.statusCode=="200"){
          this.toastr.success(respone.message)
          this.data.fun();
        }else{
          this.toastr.error(respone.message)
        }
      })
    }else{
    this.service.userCategoryService.add(this.form.value).pipe(
      catchError((error) => {
        console.error(error);
        this.toastr.error('افحص السرفر');
        return throwError(error);
      })
    ).subscribe(respone=>{
      if(respone.statusCode=="200"){
        this.toastr.success(respone.message)
        this.data.fun();
      }else{
        this.toastr.error(respone.message)
      }
    })
  }
    
  }
}

