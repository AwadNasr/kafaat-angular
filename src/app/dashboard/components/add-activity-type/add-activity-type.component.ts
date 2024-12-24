import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddActivityComponent } from '../add-activity/add-activity.component';

@Component({
  selector: 'app-add-activity-type',
  templateUrl: './add-activity-type.component.html',
  styleUrls: ['./add-activity-type.component.css']
})
export class AddActivityTypeComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,
    public dialogRef: MatDialogRef<AddActivityTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private toastr: ToastrService) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    if(this.data.type){
    this.form = this.service.formBuilder.group({
      type:[this.data.type,[Validators.required]],
      description:[this.data.description,[Validators.required]],
    });
  }else{
    this.form = this.service.formBuilder.group({
      type:['',[Validators.required]],
      description:['',[Validators.required]],
    });
  }
  }
  get type(){
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
    if(this.data.type){
      this.service.typeActivity.update({...this.form.value,"id":this.data.id}).pipe(
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
    this.service.typeActivity.add(this.form.value).pipe(
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

