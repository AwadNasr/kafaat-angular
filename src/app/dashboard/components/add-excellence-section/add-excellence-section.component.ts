import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddActivityTypeComponent } from '../add-activity-type/add-activity-type.component';
import { ExcellenceContentService } from '../../services/excellence-content.service';
@Component({
  selector: 'app-add-excellence-section',
  templateUrl: './add-excellence-section.component.html',
  styleUrls: ['./add-excellence-section.component.css']
})
export class AddExcellenceSectionComponent {
  form:FormGroup = new FormGroup({});
  Title:any
  id:any
  constructor(private service:MainDashoardService,
    public dialogRef: MatDialogRef<AddExcellenceSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private toastr: ToastrService,private ExcellenceContentService:ExcellenceContentService) {
    this.id=data  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    if(typeof this.data === 'object'){
      this.Title = 'تعديل القسم'
    this.form = this.service.formBuilder.group({
      title:[this.data.title,[Validators.required]],
      excellencePrizeId:[this.data.excellencePrizeId,[Validators.required]],
    });
  }else{
    this.Title = ' اضافة قسم'
    this.form = this.service.formBuilder.group({
      title:['',[Validators.required]],
      excellencePrizeId:[this.id,[Validators.required]],
    });
  }
  }
  get title(){
    return this.form.controls['title'];
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  submit(){
    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('excellencePrizeId', this.form.value.excellencePrizeId);
    if(typeof this.data === 'object'){
      formData.append('id', this.data.id);
      this.ExcellenceContentService.update(formData).subscribe(res => {
        if (res.statusCode == '200') {
          this.service.toastService.success(res.message);
          this.closeDialog();
        } else {
          this.service.toastService.error(res.message);
        }
      })
    }else{
    this.ExcellenceContentService.add(formData).subscribe(res => {
      if (res.statusCode == '200') {
        this.service.toastService.success(res.message);
        this.closeDialog();
      } else {
        this.service.toastService.error(res.message);
      }
    })
  }

  }
}
