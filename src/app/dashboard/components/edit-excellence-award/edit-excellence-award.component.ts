import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExcellenceAwardService } from '../../services/excellence-award.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { FormGroup, Validators } from '@angular/forms';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-edit-excellence-award',
  templateUrl: './edit-excellence-award.component.html',
  styleUrls: ['./edit-excellence-award.component.css']
})
export class EditExcellenceAwardComponent  implements OnInit , AfterViewInit{
  id:number;
  form:FormGroup = new FormGroup({});
  qualifications: any;
  constructor(private dialogRef: MatDialogRef<EditExcellenceAwardComponent>,
    public excellenceAwardService:ExcellenceAwardService,private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any){
this.id=data.id
console.log(this.id);

    }
  ngAfterViewInit(): void {
    this.loadData();
  }
    ngOnInit(): void {
      this.createForm();
      this.loadQualifications();
    }
    loadData(){
      this.excellenceAwardService.getById(this.id).subscribe({
        next:(res:ResponseVM)=>{
          if(res.statusCode==200){
            this.form.patchValue(res.data);
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
        title:['',[Validators.required]],
        description: ['', [Validators.required]],
        notes:[''],
        qualificationId:[null,[Validators.required]]
      })
    }
    get title() {
      return this.form.controls['title'];
    }
    get description() {
      return this.form.controls['description'];
    }
    get notes() {
      return this.form.controls['notes'];
    }
    get qualificationId() {
      return this.form.controls['qualificationId'];
    }
    submit() {
      if(this.form.valid){
        this.excellenceAwardService.update(this.form.value).subscribe({
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
    loadQualifications(){
      this.service.qualificationService.getAll().subscribe({
        next:(res:ResponseVM)=>{
          if(res.statusCode==200){
            this.qualifications = res.data;

          }else{
            this.service.toastService.error(res.message);
          }
        }
      });
    }
}
