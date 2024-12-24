import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { JsCssLoaderService } from '../../services/js-css-loader.service';

declare const Quill: any;

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  imports:[MatSelectModule,ReactiveFormsModule,CommonModule,NgxMatSelectSearchModule ],
  standalone:true
})
export class AddPostComponent implements OnInit,AfterViewInit {
  form:FormGroup = new FormGroup({});
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  filterActivityType:FormGroup = new FormGroup({});
  participants:any[]
  participantsFilter:any[]
  minWidth: number = 500;
  minHeight: number = 400;
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private JsCssLoaderService:JsCssLoaderService){

    }
  // ngAfterViewInit(): void {
  //  this.initializeQuillEditor()
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
  ngOnInit(): void {
   this.loadData()
    this.createForm();
    this.filterActivityType.valueChanges.subscribe(newValue => {
      this.participants = this.participantsFilter.filter(value => value.userDisplayName.includes(newValue.filterInput0));
    });
  }

  loadData(){
    this.service.activityParticipantsService.getAll(this.data.idActivity).subscribe(response=>{
      if(response.statusCode=='200'){
        this.participants=response.data
        this.participantsFilter =response.data

      }
    })
  }
  createForm(){
    if(this.data){
      this.form = this.service.formBuilder.group({
        participant:[this.data.uid,[Validators.required]],

        ImageFile:[this.data.imagePath,[Validators.required]],

      });
    }else{
      this.form = this.service.formBuilder.group({
        participant:[null,[Validators.required]],

        ImageFile:[null,[Validators.required]],

      });
    }
    this.filterActivityType=this.service.formBuilder.group({
      filterInput0:['']
    })
  }

  get filterInput0(){
    return  this.filterActivityType.controls['filterInput0'];
  }
  get participant(){
    return this.form.controls['participant'];
  }
  get ImageFile(){
    return this.form.controls['ImageFile'];
  }

  fileIn:File=null;


  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {

      if (this.isImageFile(file)) {
        this.checkImageDimensions(file).then((dimensions) => {
          const [width, height] = dimensions;
          if (width >= this.minWidth && height >= this.minHeight) {
            this.fileIn=file;
            this.ImageFile.setValue(file.name)
          } else {
            this.fileIn=file;
            this.ImageFile.setValue('')
            this.service.toastService.error('Image dimensions must be at least 1000x1000 pixels.');
          }
        })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });
    } else {

      this.ImageFile.setValue('')
      this.service.toastService.error('Please select a valid image file.');
    }

    }
  }



  submit() {
    var post=document.getElementsByClassName('ql-editor')[0].innerHTML;
    if(post=='<p><br></p>'){
      this.service.toastService.error('ادخل وصف المنشط مطلوب');
      return;
    }
    // this.service.printFormValues(this.form);
    if(this.form.valid){
        const formData = new FormData();
        formData.append('ActivityId', this.data.idActivity);
        formData.append('Description',post);
        formData.append('image', this.fileIn);
        formData.append('ParticipantId',this.form.value.participant);

        if(this.data.id){
          console.log(this.data.id);

          formData.append('Id', this.data.id);
          this.service.postService.update(formData).subscribe({
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
        this.service.postService.add(formData).subscribe({
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
      // [{ 'align': ['rtl','ltr'] }],
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

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
  async checkImageDimensions(file: File): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve([image.width, image.height]);
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.src = URL.createObjectURL(file);
    });
  }
}

