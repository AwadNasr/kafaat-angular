import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AuthService } from 'src/app/kafaat/services/auth.service';

@Component({
  selector: 'app-add-attachment-activity',
  templateUrl: './add-attachment-activity.component.html',
  styleUrls: ['./add-attachment-activity.component.css']
})
export class AddAttachmentActivityComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,private authService:AuthService,private dialogRef: MatDialogRef<AddAttachmentActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    if(this.data.id){
      this.form = this.service.formBuilder.group({
        Title:[this.data.title,[Validators.required]],
        fileAttach:[null,[Validators.required]],
      });
    }else{
      this.form = this.service.formBuilder.group({
        Title:['',[Validators.required]],
        fileAttach:[null,[Validators.required]],
      });
    }
  }
  get Title(){
    return this.form.controls['Title'];
  }
  get fileAttach(){
    return this.form.controls['fileAttach'];
  }

  fileIn:File;

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileIn=file;
    }
  }

  
  submit() {
    if(this.form.valid){
        const formData = new FormData();
        formData.append('Title', this.form.value.Title);
        formData.append('Path', this.fileIn);
        formData.append('UploadedBy',this.authService.currentUser().id);
        formData.append('ActivityId',this.data.activityId);
        formData.append('type','0');
       
        if(this.data.title){
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
            console.log(response.data);
            
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
}
