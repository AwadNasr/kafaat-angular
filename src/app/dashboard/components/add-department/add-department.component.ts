import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['../add-country/add-country.component.css','./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  subItems:any;
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<AddDepartmentComponent>){}
  ngOnInit(): void {
    this.createForm();
    this.getSubItems();
  }
  getSubItems(){
    this.service.qualificationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.subItems = res.data;
        }else{
          this.service.toastService.error(res.message);
        }
      }
    })
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      name:['',[Validators.required]],
      //qualificationId:['',[Validators.required]],
    });
  }
  get name(){
    return this.form.controls['name'];
  }
  // get qualificationId(){
  //   return this.form.controls['qualificationId'];
  // }
  submit() {
    // this.service.printFormValues(this.form);
    if(this.form.valid){
      this.service.departmentService.add(this.form.value).subscribe({
        next:(response:ResponseVM)=>{
          if(response.statusCode==200){
            this.service.toastService.success(response.message);
            this.closeDialog();
          }else{
            this.service.toastService.error(response.message);
          }
        },
        error:(error)=>{
          this.service.toastService.error(error.message);
        }
      })
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
