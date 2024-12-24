import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { JoinVolunteerFieldComponent } from '../join-volunteer-field/join-volunteer-field.component';
import { PublisherService } from 'src/app/dashboard/services/publisher.service';
import { FamilyWritingsService } from 'src/app/dashboard/services/family-writings.service';
import { ResponseVM } from '../../core/models/response-vm';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';

@Component({
  selector: 'app-join-family-writings',
  templateUrl: './join-family-writings.component.html',
  styleUrls: ['./join-family-writings.component.css']
})
export class JoinFamilyWritingsComponent {
  form:FormGroup = new FormGroup({});
  userId:any
  allFamilyWritings:any
  allQualifications:any
  constructor(public dialogRef: MatDialogRef<JoinVolunteerFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:KafaatMainService,private PublisherService:PublisherService,private dialog:MatDialog,
  private FamilyWritingsService:FamilyWritingsService ,private service1: MainDashoardService){
let _user = this.service.authService.currentUser();
let id = _user.id;
this.userId=id;
this.loadFamilyWritings();
this.loadQualifications();
    }
    closeDialog(): void {
      this.dialogRef.close();
    }
    windowWidth:number=0
    ngOnInit(): void {
      this.createForm();
    }
    loadFamilyWritings(){
      this.FamilyWritingsService.getAll().subscribe({
        next:(res:ResponseVM)=>{
          if(res.statusCode==200){
            this.allFamilyWritings = res.data;
          }else{
            this.service.toastService.error(res.message);
          }
        }
      });
    }
    loadQualifications(){
      this.service1.qualificationService.getAll().subscribe({
        next:(res:ResponseVM)=>{
          if(res.statusCode==200){
            // this.allQualifications = res.data.filter((qualification: any) => qualification.name !== "إبتدائي" );
            this.allQualifications = res.data.filter((qualification: any) =>
              qualification.name !== "إبتدائي" &&
              qualification.name !== "متوسط" &&
              qualification.name !== "ثانوي" &&
               qualification.name !== "دبلوم"
            );
          }else{
            this.service.toastService.error(res.message);
          }
        }
      });
    }
    createForm(){
      this.form = this.service.formBuilder.group({
        IsApprove:[false,[Validators.required]],
        PublishingHouse:['',[Validators.required]],
        File:[null,[Validators.required]],
        Image:[null,[Validators.required]],
        QRCode:[null,[Validators.required]],
        BriefAboutMessage:['',[Validators.required]],
        BookName:['',[Validators.required]],
        ParticipantId:[this.userId,[Validators.required]],
        FamilyWritingsId:[null,[Validators.required]],
        QualificationId:[null,[Validators.required]],
      });
    }
    get PublishingHouse() {
      return this.form.controls['PublishingHouse'];
    }
    get File() {
      return this.form.controls['File'];
    }
    get BriefAboutMessage() {
      return this.form.controls['BriefAboutMessage'];
    }
    get BookName() {
      return this.form.controls['BookName'];
    }
    get FamilyWritingsId() {
      return this.form.controls['FamilyWritingsId'];
    }
    get QualificationId() {
      return this.form.controls['QualificationId'];
    }
    fileIn: File;
    submit() {
     // if (this.form.valid) {
  const formData = new FormData();
    formData.append('IsApprove', this.form.value.IsApprove);
    formData.append('PublishingHouse', this.form.value.PublishingHouse);
    formData.append('Image', this.form.value.Image);
    formData.append('QRCode', this.form.value.QRCode);
    formData.append('BriefAboutMessage', this.form.value.BriefAboutMessage);
    formData.append('BookName', this.form.value.BookName);
    formData.append('ParticipantId', this.form.value.ParticipantId);
    formData.append('FamilyWritingsId', this.form.value.FamilyWritingsId);
    formData.append('QualificationId', this.form.value.QualificationId);
    if (this.fileIn) {
      formData.append('File', this.fileIn);
    } else {
      formData.append('File', null);
    }
    this.PublisherService.join(formData).subscribe({
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
    //}
    onFileSelected(event: any): void {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.fileIn=file;
      }
    }

}
