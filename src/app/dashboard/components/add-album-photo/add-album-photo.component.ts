import { Component, Inject } from '@angular/core';
import { AddPhotoComponent } from '../../add-photo/add-photo.component';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AlbumPhotosService } from '../../services/album-photos.service';
import { FormGroup, Validators } from '@angular/forms';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-album-photo',
  templateUrl: './add-album-photo.component.html',
  styleUrls: ['./add-album-photo.component.css']
})
export class AddAlbumPhotoComponent {
  form: FormGroup = new FormGroup({});
  title:string;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,@Inject(MAT_DIALOG_DATA) public id: number,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,private AlbumPhotosService:AlbumPhotosService,
    private dialogRef: MatDialogRef<AddAlbumPhotoComponent>) {
  }
  ngOnInit() {
    this.createForm();
}
filter: FormGroup = new FormGroup({});
createForm() {
  if (typeof this.data === 'object') {
    this.title = 'تعديل الصورة'
    this.form = this.service.formBuilder.group({
      PhotoPath: [this.data.photoPath, [Validators.required]],
      PhotoAlbumId: [this.data.photoAlbumId, [Validators.required]],

    });
  } else {


    this.title = 'إضافة صورة'
    this.form = this.service.formBuilder.group({
      PhotoPath: [null, [Validators.required]],
      PhotoAlbumId: [this.id, [Validators.required]],
    });
  }
  this.filter = this.service.formBuilder.group({
    filterInput: ['']
  })
}
get PhotoPath() {
  return this.form.controls['PhotoPath'];
}
fileIn: File;
submit() {
  console.log(this.form.valid)
  if (this.form.valid) {
    const formData = new FormData();
    formData.append('PhotoPath', this.fileIn);
    formData.append('PhotoAlbumId', this.form.value.PhotoAlbumId);
    if (this.data && typeof this.data === 'object') {
      formData.append('id', this.data.id);
      this.AlbumPhotosService.update(formData).subscribe(res => {
        if (res.statusCode == '200') {
          this.service.toastService.success(res.message);
          this.closeDialog();
        } else {
          this.service.toastService.error(res.message);
        }
      })
    } else {
      this.AlbumPhotosService.add(formData).subscribe({
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
minWidthProgram: number = 60;
minHeightProgram: number = 60;
onFileSelected(event: any): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (this.isImageFile(file)) {
    this.checkImageDimensions(file).then((dimensions) => {
      const [width, height] = dimensions;
      if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
        this.fileIn = file;
        this.PhotoPath.setValue(file.name)

      } else {
        this.fileIn = null;
        this.PhotoPath.setValue('')
        this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
      }
    })
      .catch((error) => {
        console.error('Error checking image dimensions:', error);
      });


  } else {
    this.fileIn = null;
    this.PhotoPath.setValue('')

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
