import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddExcellencePrizeComponent } from '../add-excellence-prize/add-excellence-prize.component';
import { SitePhotosService } from '../../services/site-photos.service';

@Component({
  selector: 'app-add-site-photo',
  templateUrl: './add-site-photo.component.html',
  styleUrls: ['./add-site-photo.component.css']
})
export class AddSitePhotoComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});

  title:string;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,private SitePhotosService:SitePhotosService,
    private dialogRef: MatDialogRef<AddSitePhotoComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
  }
  ngOnInit(){
    this.createForm();
  }
  createForm() {
    if (this.data) {
      this.title = 'تعديل  الصورة'
      this.form = this.service.formBuilder.group({
        Name: [this.data.name, [Validators.required]],
        Image: [this.data.image, [Validators.required]],
      });
    } else {
      this.title = 'إضافة  صورة'
      this.form = this.service.formBuilder.group({
        Name: ['', [Validators.required]],
        Image: [null, [Validators.required]],
      });
    }

    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Name() {
    return this.form.controls['Name'];
  }
  get Image() {
    return this.form.controls['Image'];
  }
  imageIn:File
  submit() {

    console.log(this.form.valid);

    if (this.form.valid) {
      const formData = new FormData();
      formData.append('Name', this.form.value.Name);
      if (this.imageIn) {
        formData.append('Image', this.imageIn);
      } else {
        formData.append('Image', null);
      }
      if (this.data) {
        formData.append('id', this.data.id);
        this.SitePhotosService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.SitePhotosService.add(formData).subscribe({
          next: (response: any) => {
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
  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageIn = file;
      this.form.patchValue({ Image: file });
      this.form.get('Image')?.updateValueAndValidity();
    }
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
}
