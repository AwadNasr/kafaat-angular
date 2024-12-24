import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddCountryComponent } from '../add-country/add-country.component';
import { VolunteerReportService } from '../../services/volunteer-report.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { PdfPopupComponent } from 'src/app/kafaat/components/pdf-popup/pdf-popup.component';

@Component({
  selector: 'app-add-volunteer-report',
  templateUrl: './add-volunteer-report.component.html',
  styleUrls: ['./add-volunteer-report.component.css']
})
export class AddVolunteerReportComponent {
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
  fileIn: File;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddVolunteerReportComponent>,public volunteerReportService:VolunteerReportService,) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  async ngOnInit(): Promise<void> {
    this.createForm();
  }
  // ngAfterViewInit(): void {
  //   // this.initializeQuillEditor()
  //   this.textPresetVal = new Choices('#choices-text-preset-values', {
  //     items: this.data != null ? this.data.objectives.map((e: any) => e.name) : []
  //   });
  // }
  createForm() {
    if (typeof this.data === 'object') {
      this.title = 'تعديل تقرير التطوع'
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, [Validators.required]],
        VolunteerId: [this.data.volunteerId],
        ReportFile: [this.data.reportFile, [Validators.required]],
      });
    } else {
      this.title = 'إضافة تقرير التطوع'
      this.form = this.service.formBuilder.group({
        Title: ['', [Validators.required]],
        VolunteerId: [this.data],
        ReportFile: [null, [Validators.required]],
      });
    }

    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Title() {
    return this.form.controls['Title'];
  }
  get ReportFile() {
    return this.form.controls['ReportFile'];
  }
  get VolunteerId() {
    return this.form.controls['VolunteerId'];
  }
  submit() {
   // if (this.form.valid) {
      const formData = new FormData();


      formData.append('Title', this.form.value.Title);
      formData.append('VolunteerId', this.form.value.VolunteerId);
      if (this.uploadedFile) {
        formData.append('ReportFile', this.uploadedFile);
      } else {
        formData.append('ReportFile', null);
      }
      if (this.data && typeof this.data === 'object') {
        formData.append('id', this.data.id);
        this.volunteerReportService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.volunteerReportService.add(formData).subscribe({
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
    // else {
    //   this.service.toastService.error("افحص كل المطلوب");
    // }
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
}
