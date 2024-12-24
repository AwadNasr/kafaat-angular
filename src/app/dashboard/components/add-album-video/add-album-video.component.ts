import { Component, Inject } from '@angular/core';
import { AlbumVideoService } from '../../services/album-video.service';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-album-video',
  templateUrl: './add-album-video.component.html',
  styleUrls: ['./add-album-video.component.css']
})
export class AddAlbumVideoComponent {
  form: FormGroup = new FormGroup({});
  title:string;
  filter: FormGroup = new FormGroup({});
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,@Inject(MAT_DIALOG_DATA) public id: number,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,private AlbumVideoService:AlbumVideoService,
    private dialogRef: MatDialogRef<AddAlbumVideoComponent>) {
  }
  ngOnInit() {
    this.createForm();
}
createForm() {
  if (typeof this.data === 'object') {
    this.title = 'تعديل الفيديو'
    this.form = this.service.formBuilder.group({
      VideoPath: [this.data.videoPath, [Validators.required]],
      VideoAlbumId: [this.data.videoAlbumId, [Validators.required]],
    });
  } else {
    this.title = 'إضافة فيديو'
    this.form = this.service.formBuilder.group({
      VideoPath: ['', [Validators.required]],
      VideoAlbumId: [this.id, [Validators.required]],
    });
  }
  this.filter = this.service.formBuilder.group({
    filterInput: ['']
  })
}
get VideoPath() {
  return this.form.controls['VideoPath'];
}
submit() {
  console.log(this.form.valid)
  if (this.form.valid) {
    const formData = new FormData();
    formData.append('VideoPath', this.form.value.VideoPath);
    formData.append('VideoAlbumId', this.form.value.VideoAlbumId);
    if (this.data && typeof this.data === 'object') {
      formData.append('id', this.data.id);
      this.AlbumVideoService.update(formData).subscribe(res => {
        if (res.statusCode == '200') {
          this.service.toastService.success(res.message);
          this.closeDialog();
        } else {
          this.service.toastService.error(res.message);
        }
      })
    } else {
      this.AlbumVideoService.add(formData).subscribe({
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
}
