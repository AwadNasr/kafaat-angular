import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-kafaat-founder',
  templateUrl: './add-kafaat-founder.component.html',
  styleUrls: ['./add-kafaat-founder.component.css']
})
export class AddKafaatFounderComponent implements OnInit {
  isOrderVisibale:boolean = false;
  kafaatFounderImage:string = "/assets/images/person.png";
  orderArray:number[]=[];
  isImageUpdated:boolean = false;
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<AddKafaatFounderComponent>){
    this.orderArray = Array.from({ length: 50 }, (_, index) => index + 1);
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      name:['',[Validators.required]],
      position:['',[Validators.required]],
      gender:['',[Validators.required]],
      positionOrder:[0,[Validators.required]],
      imageFile:[null,[]],
    });
  }
  get name(){
    return this.form.controls['name'];
  }
  get position(){
    return this.form.controls['position'];
  }
  get gender(){
    return this.form.controls['gender'];
  }
  get positionOrder(){
    return this.form.controls['positionOrder'];
  }
  get imageFile(){
    return this.form.controls['imageFile'];
  }
  
  submit() {
    // this.service.printFormValues(this.form);
    let formDataModel = this.service.mapFormValuesToFormData(this.form);
    if(this.imageFile.value == null){
      formDataModel.append('imageFile','DEFAULT_IMAGE');
    }else{
      formDataModel.append('imageFile',this.imageFile.value);
    }
    if(this.form.valid){
      this.service.kafaatFounderService.add(formDataModel).subscribe({
        next:(response:ResponseVM)=>{
          if(response.statusCode==200){
            this.service.toastService.success(response.message);
            this.closeDialog();
          }else{
            this.service.toastService.error(response.message);
          }
        },
        error:(error)=>{
          let errorMessage = 'حدث خطأ غير متوقع';
          if (error.error && typeof error.error === 'string') {
            errorMessage = error.error; // Use the error message from the 'error' property
          } else if (error.message) {
            errorMessage = error.message; // Use the 'message' property if available
          }
          this.service.toastService.error(errorMessage);
        }
      })
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  changeGender(){
    let genderValue = this.gender.value;
    let userImageIsDefault = this.kafaatFounderImage == '/assets/images/person.png' ||  this.kafaatFounderImage == '/assets/images/female.png';
    if(genderValue=='m' && userImageIsDefault){
      this.kafaatFounderImage = '/assets/images/person.png';
    }else if(genderValue=='f' && userImageIsDefault){
      this.kafaatFounderImage = '/assets/images/female.png';
    }
  }
  onUserImageSelected(event: any) {
    this.isImageUpdated = true;
    event.preventDefault();
    const image = event.target.files[0];
     let checkResult = this.validateUplodedFile(image);
     if(checkResult!=''){
      this.service.toastService.warning(checkResult);
      return;
    }
    this.kafaatFounderImage = URL.createObjectURL(image);
     this.form.controls['imageFile'].setValue(image);
  }
  validateUplodedFile(image:any,isCv:boolean = false):string{
    let imageError = "";
    let maxLimitedSize = 1024*1024*10;
    let _fileSize = image.size;  //in MB
    if(_fileSize>maxLimitedSize){
      imageError = "حجم الملف يتجاوز الحد المسموح به";
      return imageError;
    }
    let fileName = image.name;
     let fileArray:String = fileName.replace(' ','').split(".");
     let fileExtension = fileArray[fileArray.length-1].toLowerCase().toString();
    //  debugger;
    if (isCv) {
      if (fileExtension != "jpg" && fileExtension != "png" && fileExtension != "jpeg" && fileExtension != "pdf") {
        imageError = "نوع الملف  غير مسموح به";
        return imageError;
      }
    }
    else {
      if (fileExtension != "jpg" && fileExtension != "png" && fileExtension != "jpeg") {
        imageError = "نوع الملف  غير مسموح به";
        return imageError;
      }
    }
    return imageError;
  }
}
