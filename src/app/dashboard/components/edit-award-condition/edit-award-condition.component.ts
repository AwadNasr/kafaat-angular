import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { AwardConditionsService } from '../../services/award-conditions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { FormGroup, Validators } from '@angular/forms';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-edit-award-condition',
  templateUrl: './edit-award-condition.component.html',
  styleUrls: ['./edit-award-condition.component.css']
})
export class EditAwardConditionComponent implements OnInit {
  id:number;
  form:FormGroup = new FormGroup({});
  excellenceClubId:number;
  constructor(private dialogRef: MatDialogRef<EditAwardConditionComponent>,
    public awardConditionsService:AwardConditionsService,private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any){
this.id=data.id
this.loadData();
    }
      ngOnInit(): void {
        this.createForm();
      }
      loadData(){
        this.awardConditionsService.getById(this.id).subscribe({
          next:(res:ResponseVM)=>{
            if(res.statusCode==200){
              this.form.patchValue(res.data);
              this.excellenceClubId=res.data.excellenceClubId

            }else{
              this.service.toastService.error(res.message);
            }
          },
          error:(error)=>{
            this.service.toastService.error(error.error);
          }
        })
      }
      createForm(){
        this.form = this.service.formBuilder.group({
          id:[this.id,[Validators.required]],
          condition:['',[Validators.required]],
          excellenceClubId:[this.excellenceClubId,[Validators.required]]
        })
      }
      get condition() {
        return this.form.controls['condition'];
      }
      submit() {
        if(this.form.valid){
          this.awardConditionsService.update(this.form.value).subscribe({
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
