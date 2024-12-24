import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { MainDashoardService } from '../services/main-dashoard.service';
import { VideosService } from '../services/videos.service';

@Component({
  selector: 'app-add-video-album',
  templateUrl: './add-video-album.component.html',
  styleUrls: ['./add-video-album.component.css']
})
export class AddVideoAlbumComponent {
  form: FormGroup = new FormGroup({});
  id: number
  public dateMoment: moment.Moment;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  title:string;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,private VideosService:VideosService,
    private dialogRef: MatDialogRef<AddVideoAlbumComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });
  }
   ngOnInit() {
    this.createForm();
}
filter: FormGroup = new FormGroup({});
createForm() {
  if (this.data) {
    this.title = 'تعديل الابوم'
    this.form = this.service.formBuilder.group({
      Title: [this.data.title, [Validators.required]],
      CoverImage: [this.data.coverImage, [Validators.required]],
      createDate: [this.data.createDate, [Validators.required]],
      Focus: [this.data.focus, [Validators.required]],
    });
  } else {
    this.title = 'إضافة البوم'
    this.form = this.service.formBuilder.group({
      Title: ['', [Validators.required]],
      CoverImage: [null, [Validators.required]],
      createDate: ['', [Validators.required]],
      Focus: [true, [Validators.required]],
    });
  }

  this.filter = this.service.formBuilder.group({
    filterInput: ['']
  })
}
get Title() {
  return this.form.controls['Title'];
}
get CoverImage() {
  return this.form.controls['CoverImage'];
}
get createDate() {
  return this.form.controls['createDate'];
}
get Focus() {
  return this.form.controls['Focus'];
}
get filterInput() {
  return this.filter.controls['filterInput'];
}
fileIn: File;
submit() {
  console.log(this.form.valid)
  if (this.form.valid) {
    const formData = new FormData();
    var dateString = this.form.value.createDate;
    var dateObject = new Date(dateString);
    var localDate = new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000));
    var date = localDate.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
    formData.append('Title', this.form.value.Title);
    formData.append('CoverImage', this.fileIn);
    formData.append('CreateDate', date);
    formData.append('Focus', this.form.value.Focus);
    if (this.data) {
      formData.append('id', this.data.id);
      this.VideosService.update(formData).subscribe(res => {
        if (res.statusCode == '200') {
          this.service.toastService.success(res.message);
          this.closeDialog();
        } else {
          this.service.toastService.error(res.message);
        }
      })
    } else {
      this.VideosService.add(formData).subscribe({
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
  else {
    Object.keys(this.form.controls).forEach(key => {
      if (this.form.controls[key].invalid) {
        let fieldName = '';
        switch (key) {
          case 'Title':
            fieldName = 'اسم الالبوم';
            break;
          case 'CoverImage':
            fieldName = 'صورة الالبوم';
            break;
          case 'CreateDate':
            fieldName = 'التاريخ';
            break;

        }
        this.service.toastService.error(`الرجاء ادخال ${fieldName}`);
      }
    });
  }
}
minWidthProgram: number = 60;
minHeightProgram: number = 60;
onFileSelected(event: any): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (this.isImageFile(file)) {
    this.checkImageDimensions(file).then((dimensions) => {
      const [width, height] = dimensions;
      if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
        this.fileIn = file;
        this.CoverImage.setValue(file.name)

      } else {
        this.fileIn = null;
        this.CoverImage.setValue('')
        this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
      }
    })
      .catch((error) => {
        console.error('Error checking image dimensions:', error);
      });


  } else {
    this.fileIn = null;
    this.CoverImage.setValue('')

  }
}
async checkImageDimensions(file: File): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve([image.width, image.height]);
    };
    image.onerror = (error) => {
      reject(error);
    };
    image.src = URL.createObjectURL(file);
  });
}
isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}
closeDialog(): void {
  this.dialogRef.close();
}
}
