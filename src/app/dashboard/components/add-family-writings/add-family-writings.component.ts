import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddVolunteerComponent } from '../add-volunteer/add-volunteer.component';
import { FamilyWritingsService } from '../../services/family-writings.service';
import { JsCssLoaderService } from '../../services/js-css-loader.service';
declare const Quill: any;
declare const Choices: any;
@Component({
  selector: 'app-add-family-writings',
  templateUrl: './add-family-writings.component.html',
  styleUrls: ['./add-family-writings.component.css']
})
export class AddFamilyWritingsComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});

  id: number
  public dateMoment: moment.Moment;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;

  title:string;
  textPresetVal: any;
  isSaveButtonShown: boolean = false
  imageObject = {introductoryFilePath:''};
  introductoryFilePath: string;
  checkResult:any
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service: MainDashoardService,private FamilyWritingsService:FamilyWritingsService,private JsCssLoaderService:JsCssLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddFamilyWritingsComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');

  }
  async ngOnInit(): Promise<void> {

    this.createForm();

  }
  // ngAfterViewInit(): void {
  //   this.initializeQuillEditor()
  //   this.textPresetVal = new Choices('#choices-text-preset-values', {
  //     items: this.data != null ? this.data.objectives.map((e: any) => e.name) : []
  //   });
  // }
  async ngAfterViewInit(): Promise<void> {
    // Load the Quill CSS files lazily
    try {
      await this.JsCssLoaderService.loadCSSFiles([
        'assets/libs/quill.snow.css',
        'assets/libs/quill.bubble.css'
      ]);
      // Load the Quill and editor scripts lazily
      await this.JsCssLoaderService.loadScripts([
        'assets/libs/quill.min.js',
        'assets/js/quill-editor.js'
      ]);
      this.initializeQuillEditor();
    } catch (error) {
      console.error('Error loading CSS or scripts:', error);
    }
  }
  createForm() {
    if (this.data) {
      this.title = 'تعديل المؤلف'
      this.form = this.service.formBuilder.group({
        Name: [this.data.name, [Validators.required]],
        Statics: [this.data.statics],
      });
    } else {
      this.title = 'إضافة  المؤلف'
      this.form = this.service.formBuilder.group({
        Name: ['', [Validators.required]],
        Statics: [0],
      });
    }
    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Name() {
    return this.form.controls['Name'];
  }
  get Description() {
    return this.form.controls['Description'];
  }
  get Statics() {
    return this.form.controls['Statics'];
  }



  fileIn: File;
  async submit() {

    var post = document.getElementsByClassName('ql-editor')[0].innerHTML;

    if (post == '<p><br></p>') {
      this.service.toastService.error('ادخل وصف المؤلف ');
      return;
    }

   if(this.form.valid) {
    const formData = new FormData();
    formData.append('Name', this.form.value.Name);
    formData.append('Statics', this.form.value.Statics);
    formData.append('Description', post);
      if (this.data) {
        formData.append('id', this.data.id);
        this.FamilyWritingsService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.FamilyWritingsService.add(formData).subscribe({
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
      console.log(this.form);
      this.service.toastService.error("افحص كل المطلوب");
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private initializeQuillEditor() {
    const toolbarOptions = [
      ['bold', 'underline'],
    ];

    const quill = new Quill(this.editorElement.nativeElement, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });
  }
}
