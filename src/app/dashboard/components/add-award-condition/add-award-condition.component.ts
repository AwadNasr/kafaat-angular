import { Component, Inject, OnInit } from '@angular/core';
import { AwardConditionsService } from '../../services/award-conditions.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { FormGroup, Validators } from '@angular/forms';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-award-condition',
  templateUrl: './add-award-condition.component.html',
  styleUrls: ['./add-award-condition.component.css']
})
export class AddAwardConditionComponent implements OnInit{
  excellenceaward:number;
  constructor(private dialogRef: MatDialogRef<AddAwardConditionComponent>,
    public awardConditionsService:AwardConditionsService,private service: MainDashoardService
    ,@Inject(MAT_DIALOG_DATA) public data: any){
      console.log(data);
      this.excellenceaward=data

    }
    ngOnInit(): void {
      this.createForm();
    }
    form: FormGroup = new FormGroup({});
    qualifications:any[];
    createForm(){
      this.form = this.service.formBuilder.group({
        condition:['',[Validators.required]],
        excellenceClubId:[this.excellenceaward,[Validators.required]]
      })
    }
    get condition() {
      return this.form.controls['condition'];
    }
   
    submit() {
      if(this.form.valid){
        this.awardConditionsService.add(this.form.value).subscribe({
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
