import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExcellenceAwardService } from '../../services/excellence-award.service';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-excellence-club',
  templateUrl: './add-excellence-club.component.html',
  styleUrls: ['./add-excellence-club.component.css']
})
export class AddExcellenceClubComponent implements OnInit{
constructor(private dialogRef: MatDialogRef<AddExcellenceClubComponent>,
  public excellenceAwardService:ExcellenceAwardService,private service: MainDashoardService,){}
  ngOnInit(): void {
    this.createForm();
    this.loadQualifications();
  }
  form: FormGroup = new FormGroup({});
  qualifications:any[];
  createForm(){
    this.form = this.service.formBuilder.group({
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
      this.excellenceAwardService.add(this.form.value).subscribe({
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
