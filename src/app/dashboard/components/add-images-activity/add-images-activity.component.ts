import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AuthService } from 'src/app/kafaat/services/auth.service';

@Component({
  selector: 'app-add-images-activity',
  templateUrl: './add-images-activity.component.html',
  styleUrls: ['./add-images-activity.component.css']
})
export class AddImagesActivityComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  minWidth: number = 300;
  minHeight: number = 300;
  constructor(private auth:AuthService,private service:MainDashoardService,private dialogRef: MatDialogRef<AddImagesActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    if(this.data.id){
      this.form = this.service.formBuilder.group({
        fileAttach:[this.data.path,[Validators.required]],
      });
    }else{
      this.form = this.service.formBuilder.group({
        fileAttach:[null,[Validators.required]],
      });
    }
  }
  get fileAttach(){
    return this.form.controls['fileAttach'];
  }

  fileIn:File;

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (this.isImageFile(file)) {
        this.checkImageDimensions(file).then((dimensions) => {
          const [width, height] = dimensions;
          if (width >= this.minWidth && height >= this.minHeight) {
            this.fileIn=file;
        
          } else {
            this.fileIn=null;
            this.fileAttach.setValue('')
            this.service.toastService.error(`Image dimensions must be at least ${this.minWidth}*${this.minHeight} pixels.`);
          }
        })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });
    } else {
      this.fileIn=file;
      this.fileAttach.setValue('')
      this.service.toastService.error('Please select a valid image file.');
    }
      
    }
  }

  
  submit() {
    if(this.form.valid){
        const formData = new FormData();
        formData.append('Path', this.fileIn);
        formData.append('title', 'image');
        formData.append('UploadedBy', this.auth.currentUser().id);
        formData.append('ActivityId',this.data.activityId);
        formData.append('type','1');
       
        if(this.data.path){
          formData.append('id', this.data.id);
          this.service.attachmentsActivity.update(formData).subscribe({
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
        }else{
          formData.append('id', '0');
        this.service.attachmentsActivity.add(formData).subscribe({
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
    }else{
      this.service.toastService.error("افحص كل المطلوب");
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
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
}
