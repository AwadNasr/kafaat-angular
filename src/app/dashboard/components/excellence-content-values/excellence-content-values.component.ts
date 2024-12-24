import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddExcellencePrizeComponent } from '../add-excellence-prize/add-excellence-prize.component';
import { ExcellenceSectionValuesService } from '../../services/excellence-section-values.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-excellence-content-values',
  templateUrl: './excellence-content-values.component.html',
  styleUrls: ['./excellence-content-values.component.css']
})
export class ExcellenceContentValuesComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  id: number
  title:string;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ExcellenceContentValuesComponent>,private ExcellenceSectionValuesService:ExcellenceSectionValuesService) {
    this.id=data
  }
  ngOnInit(){
    this.createForm();
  }
  createForm() {
    if (typeof this.data === 'object') {
      this.title = 'تعديل  القيمة'
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, [Validators.required]],
        Description:[this.data.description],
        Image: [this.data.image],
        Link: [this.data.link],
        StaticContentId: [this.data.staticContentId, [Validators.required]],
      });
    } else {
      this.title = 'إضافة قيمة'
      this.form = this.service.formBuilder.group({
        Title: ['', [Validators.required]],
        Description:[''],
        Image: [null],
        Link: [''],
        StaticContentId: [this.id, [Validators.required]],
      });
    }

    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Title() {
    return this.form.controls['Title'];
  }
  get Description() {
    return this.form.controls['Description'];
  }
  get Image() {
    return this.form.controls['Image'];
  }
  get Link() {
    return this.form.controls['Link'];
  }
  get StaticContentId() {
    return this.filter.controls['StaticContentId'];
  }
  get filterInput() {
    return this.filter.controls['filterInput'];
  }
  imageIn:File
  submit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('Title', this.form.value.Title);
      formData.append('Description',  this.form.value.Description);
      formData.append('Image', this.imageIn);
      formData.append('Link', this.form.value.Link);
      formData.append('StaticContentId', this.form.value.StaticContentId);
      if (this.data && typeof this.data === 'object') {
        formData.append('id', this.data.id);
        this.ExcellenceSectionValuesService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.ExcellenceSectionValuesService.add(formData).subscribe({
          next: (response: ResponseVM) => {
            if (response.statusCode == 200) {
              this.service.toastService.success(response.message);
              this.closeDialog();
            } else {
              this.service.toastService.error(response.message);
            }
          },
          error: (error) => {
            this.service.toastService.error(error);
          }
        })
      }
    }
    }
    closeDialog(): void {
      this.dialogRef.close();
    }
    onFileSelected2(event: any): void {
      const file = (event.target as HTMLInputElement).files?.[0];
       if(file){
        this.imageIn = file;
        this.Image.setValue(file.name)
       }else{
        this.imageIn = null;
        this.Image.setValue('')
       }
    }
  }

