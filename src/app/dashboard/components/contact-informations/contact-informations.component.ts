import { Component, OnInit } from '@angular/core';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-informations',
  templateUrl: './contact-informations.component.html',
  styleUrls: ['./contact-informations.component.css']
})
export class ContactInformationsComponent implements OnInit {
  form:FormGroup = new FormGroup({});

  constructor(private service:MainDashoardService){}
  ngOnInit(): void {
    this.createForm();
    this.get();
  }
  createForm(){
    this. form = this.service.formBuilder.group({
      id:[0,[Validators.required]],
      title:['',[Validators.required]],
      location:['',[Validators.required]],
      email:['',[Validators.required]],
      facebookLink:['',[Validators.required]],
      whatsapp:['',[Validators.required]],
      twitterLink:['',[Validators.required]],
      instagramLink:['',[Validators.required]],
      telegramLink:['',[Validators.required]],
      snapchatLink:['',[Validators.required]],
      youtubeLink:['',[Validators.required]],
      linkedInLink:['',[Validators.required]],
      introductoryVideoLink:['',[Validators.required]],
      liveFeedLink:['',[Validators.required]],
      year:[''],
      activityNum:[''],
      userNum:[''],
      homeImage:[null]
    });
  }
  image:any
  get(){
    this.service.contactInformationService.get().subscribe({
      next:(res:ResponseVM)=>{
        if (res.statusCode == 200) {
          console.log(1);
            this.image = res.data.homeImage;
            console.log(this.image);

          this.form.controls['id'].setValue(res.data.id);
          this.form.controls['title'].setValue(res.data.title);
          this.form.controls['location'].setValue(res.data.location);
          this.form.controls['email'].setValue(res.data.email);
          this.form.controls['facebookLink'].setValue(res.data.facebookLink);
          this.form.controls['whatsapp'].setValue(res.data.whatsapp);
          this.form.controls['twitterLink'].setValue(res.data.twitterLink);
          this.form.controls['instagramLink'].setValue(res.data.instagramLink);
          this.form.controls['telegramLink'].setValue(res.data.telegramLink);
          this.form.controls['snapchatLink'].setValue(res.data.snapchatLink);
          this.form.controls['youtubeLink'].setValue(res.data.youtubeLink);
          this.form.controls['linkedInLink'].setValue(res.data.linkedInLink);
          this.form.controls['introductoryVideoLink'].setValue(res.data.introductoryVideoLink);
          this.form.controls['liveFeedLink'].setValue(res.data.liveFeedLink);
          this.form.controls['year'].setValue(res.data.year);
          this.form.controls['activityNum'].setValue(res.data.activityNum);
          this.form.controls['userNum'].setValue(res.data.userNum);
          this.form.controls['homeImage'].setValue(res.data.homeImage);






        }
        else {
          this.service.toastService.error(res.message);
        }
      },error:(error)=>{
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Use the error message from the 'error' property
        } else if (error.message) {
          errorMessage = error.message; // Use the 'message' property if available
        }
        this.service.toastService.error(errorMessage);
      }
    });
  }


  submit(){
    const formData = new FormData();

  Object.keys(this.form.controls).forEach((key) => {
    if (key !== 'homeImage') {
      const value = this.form.get(key)?.value;
      formData.append(key, value || '');
    }
  });


  if (this.fileIn) {
    formData.append('homeImage', this.fileIn);
  }
    this.service.contactInformationService.createOrUpdate(formData).subscribe({
      next:(res:ResponseVM)=>{
        if (res.statusCode == 200) {
          if (res.data) {
            this.service.toastService.success(res.message);
            this.get();
          }
          else {
            this.service.toastService.warning(res.message);
          }
        }
        else {
          this.service.toastService.error(res.message);
        }
      },error:(error)=>{
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Use the error message from the 'error' property
        } else if (error.message) {
          errorMessage = error.message; // Use the 'message' property if available
        }
        this.service.toastService.error(errorMessage);
      }
    });
  }
  fileIn:File;

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileIn=file;
      const reader = new FileReader();
        reader.onload = (e: any) => {
          this.image = e.target.result; // Set the image source for preview
        };
        reader.readAsDataURL(file);
    }
  }
  handleIntroductoryVideoLink() {
    let introductoryVideoLinkValue = this.form.controls['introductoryVideoLink'].value;
    let newValue ='';
    let splitText = introductoryVideoLinkValue.split('src="');
    if (splitText.length > 0) {
      let includes = splitText[1];
      let secondSplit = includes.split('"');
      if(secondSplit.length>0){
        newValue = secondSplit[0];
      }else{
        newValue = introductoryVideoLinkValue;
      }
    } else {
     newValue = introductoryVideoLinkValue;
    }
    this.form.controls['introductoryVideoLink'].setValue(newValue);
  }
  handleLiveFeedLink() {
    let liveFeedLinkValue = this.form.controls['liveFeedLink'].value;
    let newValue ='';
    let splitText = liveFeedLinkValue.split('src="');
    if (splitText.length > 0) {
      let includes = splitText[1];
      let secondSplit = includes.split('"');
      if(secondSplit.length>0){
        newValue = secondSplit[0];
      }else{
        newValue = liveFeedLinkValue;
      }
    } else {
     newValue = liveFeedLinkValue;
    }
    this.form.controls['liveFeedLink'].setValue(newValue);
  }
}
