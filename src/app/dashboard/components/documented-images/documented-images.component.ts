import { Component, OnInit } from '@angular/core';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { FormGroup, Validators } from '@angular/forms';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-documented-images',
  templateUrl: './documented-images.component.html',
  styleUrls: ['./documented-images.component.css']
})
export class DocumentedImagesComponent implements OnInit {
  imageNumber1:string = '/assets/images/about2.png';
  imageNumber2:string = '/assets/images/about3.png';
  imageNumber3:string = '/assets/images/about4.png';
  imageNumber4:string = '/assets/images/about5.png';
  imageNumber5:string = '/assets/images/about6.png';
  imageNumber6:string = '/assets/images/about7.png';
  documentedImageItems:any[]=[];

  imageInfo:any[] = [
    {image_no:1,isSaveButtonShown:false},
    {image_no:2,isSaveButtonShown:false},
    {image_no:3,isSaveButtonShown:false},
    {image_no:4,isSaveButtonShown:false},
    {image_no:5,isSaveButtonShown:false},
    {image_no:6,isSaveButtonShown:false}
  ];

  imageObject = {imageOrder:0,imageFile:''};
  
  constructor(private service:MainDashoardService){}
  ngOnInit(): void {
    this.getDocumentedImage();
  }
  getDocumentedImage(){
    this.service.documentedImageService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        this.documentedImageItems = res.data;
        this.imageNumber1 = this.documentedImageItems.find(x=>x.imageOrder==1) ?  this.documentedImageItems.find(x=>x.imageOrder==1).imagePath : '/assets/images/about2.png';
        this.imageNumber2 = this.documentedImageItems.find(x=>x.imageOrder==2) ?  this.documentedImageItems.find(x=>x.imageOrder==2).imagePath : '/assets/images/about3.png';
        this.imageNumber3 = this.documentedImageItems.find(x=>x.imageOrder==3) ?  this.documentedImageItems.find(x=>x.imageOrder==3).imagePath : '/assets/images/about4.png';
        this.imageNumber4 = this.documentedImageItems.find(x=>x.imageOrder==4) ?  this.documentedImageItems.find(x=>x.imageOrder==4).imagePath : '/assets/images/about5.png';
        this.imageNumber5 = this.documentedImageItems.find(x=>x.imageOrder==5) ?  this.documentedImageItems.find(x=>x.imageOrder==5).imagePath : '/assets/images/about6.png';
        this.imageNumber6 = this.documentedImageItems.find(x=>x.imageOrder==6) ?  this.documentedImageItems.find(x=>x.imageOrder==6).imagePath : '/assets/images/about7.png';
      }
    });
  }
  
  onChangeImage(event: any,imageNumber:number) {
    event.preventDefault();
    const image = event.target.files[0];
     let checkResult = this.validateUplodedFile(image);
     if(checkResult!=''){
      this.service.toastService.warning(checkResult);
      return;
    }
    this.showEditButtonForSpecificElement(imageNumber);
    switch(imageNumber){
      case 1 : {
        this.imageNumber1 = URL.createObjectURL(image);
        this.imageObject.imageFile = image;
        this.imageObject.imageOrder = 1;
        break;
      }
      case 2 : {
        this.imageNumber2 = URL.createObjectURL(image);
        this.imageObject.imageFile = image;
        this.imageObject.imageOrder = 2;
        break;
      }
      case 3 : {
        this.imageNumber3 = URL.createObjectURL(image);
        this.imageObject.imageFile = image;
        this.imageObject.imageOrder = 3;
        break;
      }
      case 4 : {
        this.imageNumber4 = URL.createObjectURL(image);
        this.imageObject.imageFile = image;
        this.imageObject.imageOrder = 4;
        break;
      }
      case 5 : {
        this.imageNumber5 = URL.createObjectURL(image);
        this.imageObject.imageFile = image;
        this.imageObject.imageOrder = 5;
        break;
      }
      case 6 : {
        this.imageNumber6 = URL.createObjectURL(image);
        this.imageObject.imageFile = image;
        this.imageObject.imageOrder = 6;
        break;
      }
      default : {
        break;
      }
    }
  }
  showEditButtonForSpecificElement(no:number){
    this.imageInfo.map(item=>{
      item.image_no==no?item.isSaveButtonShown=true:item.isSaveButtonShown=false
    });
  }
  validateUplodedFile(image:any):string{
    let imageError = "";
    let maxLimitedSize = 1024 * 1024 * 10;
    let _fileSize = image.size;  //in MB
    if (_fileSize > maxLimitedSize) {
      imageError = "حجم الملف يتجاوز الحد المسموح به";
      return imageError;
    }
    let fileName = image.name;
    let fileArray: String = fileName.replace(' ', '').split(".");
    let fileExtension = fileArray[fileArray.length - 1].toLowerCase().toString();

    if (fileExtension != "jpg" && fileExtension != "png" && fileExtension != "jpeg") {
      imageError = "نوع الملف  غير مسموح به";
      return imageError;
    }

    return imageError;
  }
  saveImage() {
    let formData = new FormData();
    formData.append('imageOrder', this.imageObject.imageOrder.toString());
    formData.append('imageFile', this.imageObject.imageFile);
    if (this.imageObject.imageOrder != 0 && (this.imageObject.imageFile != '' || this.imageObject.imageFile != null))
      this.service.documentedImageService.createOrUpdate(formData).subscribe({
        next: (response: ResponseVM) => {
          if (response.statusCode == 200) {
            this.service.toastService.success(response.message);
          } else {
            this.service.toastService.error(response.message);
          }
          this.imageInfo.map(item=>{
            item.isSaveButtonShown=false;
          });
        },
        error: (error) => {
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
}
