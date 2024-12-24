import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { PdfPopupComponent } from 'src/app/kafaat/components/pdf-popup/pdf-popup.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mix-page',
  templateUrl: './mix-page.component.html',
  styleUrls: ['./mix-page.component.css']
})
export class MixPageComponent implements OnInit, AfterViewInit {
  homeImagePath:string = '/assets/images/about2.png';
  introductoryFilePath:string = '/assets/images/about3.png';
  homeVideoPath:string = '';

  itemInfo:any[] = [
    {item_No:'homeImagePath',isSaveButtonShown:false},
    {item_No:'introductoryFilePath',isSaveButtonShown:false},
    {item_No:'homeVideoPath',isSaveButtonShown:false},
  ];

  imageObject = {homeImagePath:'',introductoryFilePath:'',homeVideoPath:''};

  constructor(private service:MainDashoardService,private location:Location){
  }
  ngAfterViewInit(): void {
    this.getMixData();
    }
  ngOnInit(): void {
    this.getMixData();
  }
  getMixData(){
    this.service.mixService.get().subscribe({
      next: (res: ResponseVM) => {
        if (res.statusCode == 200) {
        //  debugger;
          this.homeImagePath = res.data.homeImagePath;
          this.introductoryFilePath = res.data.introductoryFilePath;
          this.homeVideoPath = res.data.homeVideoPath;
        }
      }
    });
  }

  onChangeFile(event: any,fieldName:string,type:string) {
    event.preventDefault();
    const uploadedFile = event.target.files[0];
     let checkResult = type == FileType.Image ? this.validateUplodedImage(uploadedFile) :(type == FileType.PDF?this.validateUplodedFile(uploadedFile):this.validateUplodedVideo(uploadedFile));
     if(checkResult!=''){
      this.service.toastService.warning(checkResult);
      return;
    }
     this.showEditButtonForSpecificElement(fieldName);
    switch(fieldName){
      case 'homeImagePath' : {
        this.homeImagePath = URL.createObjectURL(uploadedFile);
        this.imageObject.homeImagePath = uploadedFile;
        break;
      }
      case 'introductoryFilePath' : {
        this.introductoryFilePath = URL.createObjectURL(uploadedFile);
        this.imageObject.introductoryFilePath = uploadedFile;
        break;
      }
      case 'homeVideoPath' : {
        this.homeVideoPath = URL.createObjectURL(uploadedFile);
        this.imageObject.homeVideoPath = uploadedFile;
        break;
      }
      default : {
        break;
      }
    }
  }
  showEditButtonForSpecificElement(fieldName:string){
    this.itemInfo.map(item=>{
      item.item_No==fieldName?item.isSaveButtonShown=true:item.isSaveButtonShown=false
    });
  }
  validateUplodedImage(image:any):string{
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
  validateUplodedFile(image:any):string{
    let fileError = "";
    let maxLimitedSize = 1024 * 1024 * 10;
    let _fileSize = image.size;  //in MB
    if (_fileSize > maxLimitedSize) {
      fileError = " حجم الملف يتجاوز الحد المسموح به و هو 10 ميجا بايت";
      return fileError;
    }
    let fileName = image.name;
    let fileArray: String = fileName.replace(' ', '').split(".");
    let fileExtension = fileArray[fileArray.length - 1].toLowerCase().toString();

    if (fileExtension != "pdf") {
      fileError = "نوع الملف  المسموح به نوع الـ PDF فقط";
      return fileError;
    }

    return fileError;
  }
  validateUplodedVideo(video:any):string{
    let fileError = "";
    let maxLimitedSize = 1024 * 1024 * 30;
    let _fileSize = video.size;  //in MB
    if (_fileSize > maxLimitedSize) {
      fileError = " حجم الملف يتجاوز الحد المسموح به و هو 30 ميجا بايت";
      return fileError;
    }
    let fileName = video.name;
    let fileArray: String = fileName.replace(' ', '').split(".");
    let fileExtension = fileArray[fileArray.length - 1].toLowerCase().toString();
    var videoTypesExtensions = ["mp4", "avi", "mov", "wmv", "flv", "mpg", "webm", "3gp", "ogv"];

    if (!videoTypesExtensions.includes(fileExtension)) {
      fileError = "نوع الفيديو غير مسموح به";
      return fileError;
    }

    return fileError;
  }
  submit() {
    let formData = new FormData();
    this.imageObject.homeImagePath = this.imageObject.homeImagePath==''?null:this.imageObject.homeImagePath;
    this.imageObject.introductoryFilePath = this.imageObject.introductoryFilePath==''?null:this.imageObject.introductoryFilePath;
    this.imageObject.homeVideoPath = this.imageObject.homeVideoPath==''?null:this.imageObject.homeVideoPath;
    formData.append('homeImagePath', this.imageObject.homeImagePath);
    formData.append('introductoryFilePath', this.imageObject.introductoryFilePath);
    formData.append('homeVideoPath', this.imageObject.homeVideoPath);
    if (this.imageObject.introductoryFilePath != null || this.imageObject.homeImagePath != null || this.imageObject.homeVideoPath != null)
      this.service.mixService.createOrUpdate(formData).subscribe({
        next: (response: ResponseVM) => {
          if (response.statusCode == 200) {
            this.service.toastService.success(response.message);
          } else {
            this.service.toastService.error(response.message);
          }
          this.itemInfo.map(item=>{
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
  showIntroductoryFilePath(){
    this.service.dialog.open(PdfPopupComponent,{
      width:'90%',
      height:'90%',
      data:{
        cvPdf:this.introductoryFilePath,
      }
    })
  }
}

export class FileType{
  public static Image:string = "Image";
  public static PDF:string = "PDF";
  public static Video:string = "Video";
}
