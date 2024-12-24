import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-specializations',
  templateUrl: './add-specializations.component.html',
  styleUrls: ['../add-country/add-country.component.css','./add-specializations.component.css']
})
export class AddSpecializationsComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  subItems:any;
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<AddSpecializationsComponent>){}
  ngOnInit(): void {
    this.createForm();
    this.getSubItems();
  }
  getSubItems(){
    this.service.departmentService.getAll().subscribe({
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
      departmentId:['',[Validators.required]],
    });
  }
  get name(){
    return this.form.controls['name'];
  }
  get departmentId(){
    return this.form.controls['departmentId'];
  }
  submit() {
    // this.service.printFormValues(this.form);
    if(this.form.valid){
      this.service.specializationService.add(this.form.value).subscribe({
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
