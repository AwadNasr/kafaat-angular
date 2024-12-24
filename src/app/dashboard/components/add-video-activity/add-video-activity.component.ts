import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddAttachmentActivityComponent } from '../add-attachment-activity/add-attachment-activity.component';
import { AuthService } from 'src/app/kafaat/services/auth.service';
import { JsCssLoaderService } from '../../services/js-css-loader.service';
declare const Quill: any;
@Component({
  selector: 'app-add-video-activity',
  templateUrl: './add-video-activity.component.html',
  styleUrls: ['./add-video-activity.component.css']
})
export class AddVideoActivityComponent  implements OnInit, AfterViewInit {
  form:FormGroup = new FormGroup({});
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private auth:AuthService,private service:MainDashoardService,private dialogRef: MatDialogRef<AddAttachmentActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private JsCssLoaderService:JsCssLoaderService){}
  // ngAfterViewInit(): void {
  //   this.initializeQuillEditor()
  // }
  ngOnInit(): void {
    this.createForm();
  }
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
      // this.textPresetVal = new Choices('#choices-text-preset-values', {
      //        items: this.data != null ? this.data.objectives.map((e: any) => e.name) : []
      //      });
    } catch (error) {
      console.error('Error loading CSS or scripts:', error);
    }
  }
  createForm(){
    if(this.data.id){
      console.log("data",this.data);

      this.form = this.service.formBuilder.group({
        Title:[this.data.title,[Validators.required]],
        videoTitle:[this.data.videoTitle,[Validators.required]],
        fileAttach:[null,[Validators.required]],
      });
    }else{
      this.form = this.service.formBuilder.group({
        Title:['',[Validators.required]],
        videoTitle:['',[Validators.required]],

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
  get videoTitle(){
    return this.form.controls['videoTitle'];
  }


  fileIn:File;

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileIn=file;
    }
  }


  submit() {
    var post=document.getElementsByClassName('ql-editor')[0].innerHTML;
    if(post=='<p><br></p>'){
      this.service.toastService.error('ادخل الوصف  ');
      return;
    }
    if(this.form.valid){
        const formData = new FormData();
        formData.append('Title', this.form.value.Title);
        formData.append('Path', this.fileIn);
        formData.append('UploadedBy', this.auth.currentUser().id);
        formData.append('videoTitle',this.form.value.videoTitle);
        formData.append('videoDescription',post);
        formData.append('ActivityId',this.data.activityId);
        formData.append('type','2');

        if(this.data.title){
          formData.append('id', this.data.id);
          this.service.attachmentsActivity.update(formData).subscribe({
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

  private initializeQuillEditor() {
    const toolbarOptions = [
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      // [{ "font": [12,15,20,25,30] }],
      ['bold', 'underline'],
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],
      // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      // [{ 'script': 'sub' }, { 'script': 'super' }],
      // [{ 'indent': '-1' }, { 'indent': '+1' }],
      // [{ 'direction': 'rtl' }],
      // [{ 'size': ['small', false, 'large', 'huge'] }],
      // [{ 'color': ['red','white','black','yellow','blue','green'] }, { 'background': ['red','white','black','yellow','blue','green'] }],
      // // [{ 'align': ['rtl','ltr'] }],
      // ['image', 'video'],
      // ['clean']
    ];

    const quill = new Quill(this.editorElement.nativeElement, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });


  }
}
