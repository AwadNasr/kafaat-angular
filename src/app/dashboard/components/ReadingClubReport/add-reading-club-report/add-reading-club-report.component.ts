import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { AddCountryComponent } from '../../add-country/add-country.component';
import { PdfPopupComponent } from 'src/app/kafaat/components/pdf-popup/pdf-popup.component';
declare const Quill: any;
declare const Choices: any;
@Component({
  selector: 'app-add-reading-club-report',
  templateUrl: './add-reading-club-report.component.html',
  styleUrls: ['./add-reading-club-report.component.css']
})
export class AddReadingClubReportComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;
  minWidthDes: number = 600;
  minHeightDes: number = 650;
  textPresetVal: any;
  users: any[];
  id: number
  public dateMoment: moment.Moment;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  title:string;
  isSaveButtonShown: boolean = false
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  homeImagePath: string;
  imageObject = {introductoryFilePath:''};
  introductoryFilePath: string;
  homeVideoPath: string;
  checkResult:any
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddCountryComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }

  async ngOnInit(): Promise<void> {
    this.createForm();
  }

  ngAfterViewInit(): void {
    // this.initializeQuillEditor()
    this.textPresetVal = new Choices('#choices-text-preset-values', {
      items: this.data != null ? this.data.objectives.map((e: any) => e.name) : []
    });
  }
  createForm() {
    if (this.data) {
      console.log(this.data);

      this.title = 'تعديل تقرير النادي'
      this.form = this.service.formBuilder.group({
        Year: [this.data.year, [Validators.required]],
        Partners: [this.data.partners, [Validators.required]],
        ReadedBooks: [this.data.readedBooks, [Validators.required]],
        Benefits: [this.data.benefits, [Validators.required]],
        // reportFile: [this.data.reportFile, [Validators.required]],
      });
    } else {
      this.title = 'إضافة تقرير النادي'
      this.form = this.service.formBuilder.group({
        Year: ['', [Validators.required]],
        Partners: ['', [Validators.required]],
        ReadedBooks: ['', [Validators.required]],
        Benefits: ['', [Validators.required]],
        // reportFile: [null, [Validators.required]],

      });
    }

    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Year() {
    return this.form.controls['Year'];
  }
  get Partners() {
    return this.form.controls['Partners'];
  }
  get ReadedBooks() {
    return this.form.controls['ReadedBooks'];
  }
  get Benefits() {
    return this.form.controls['Benefits'];
  }
  get ClubImage() {
    return this.form.controls['ClubImage'];
  }


  fileIn: File;
  submit() {
    if (this.form.valid) {
      const formData = new FormData();

      formData.append('Year', this.form.value.Year);
      formData.append('Benefits', this.form.value.Benefits);
      formData.append('ReadedBooks', this.form.value.ReadedBooks);
      formData.append('Partners', this.form.value.Partners);
      formData.append('reportFile', this.uploadedFile);
      console.log(this.uploadedFile);
      console.log(formData);

      // formData.append('id', '0');
      if (this.data) {
        formData.append('id', this.data.id);
        this.service.ReadingClubReportService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.service.ReadingClubReportService.add(formData).subscribe({
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
      this.service.toastService.error("افحص كل المطلوب");
    }
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
  uploadedFile: File;
  onChangeFile(event: any,fieldName:string,type:string) {
    event.preventDefault();
    this.isSaveButtonShown=true;
     this.uploadedFile = event.target.files[0];
      this.checkResult = this.validateUplodedFile(this.uploadedFile) ;
     if(this.checkResult!=''){
      this.service.toastService.warning(this.checkResult);
      return;
    }
    this.introductoryFilePath = URL.createObjectURL(this.uploadedFile);
    console.log(this.introductoryFilePath);

    // this.imageObject.introductoryFilePath = this.uploadedFile;
    // console.log(this.imageObject.introductoryFilePath);


  }

  validateUplodedFile(image:any):string{
    let fileError = "";
    let maxLimitedSize = 1024 * 1024 * 30;
    let _fileSize = image.size;  //in MB
    if (_fileSize > maxLimitedSize) {
      fileError = " حجم الملف يتجاوز الحد المسموح به و هو 30 ميجا بايت";
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
