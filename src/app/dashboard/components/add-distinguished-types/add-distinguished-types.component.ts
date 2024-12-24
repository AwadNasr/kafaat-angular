import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-distinguished-types',
  templateUrl: './add-distinguished-types.component.html',
  styleUrls: ['../add-country/add-country.component.css','./add-distinguished-types.component.css']
})
export class AddDistinguishedTypesComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<AddDistinguishedTypesComponent>){}
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      name:['',[Validators.required]],
    });
  }
  get name(){
    return this.form.controls['name'];
  }
  submit() {
    // this.service.printFormValues(this.form);
    if(this.form.valid){
      this.service.distinguishedTypeService.add(this.form.value).subscribe({
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
