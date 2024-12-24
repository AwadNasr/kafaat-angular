import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddCountryComponent } from '../add-country/add-country.component';
import { AuthService } from 'src/app/kafaat/services/auth.service';
import { JsCssLoaderService } from '../../services/js-css-loader.service';
declare const Quill: any;
declare const Choices: any;
@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent implements OnInit ,AfterViewInit{
  form:FormGroup = new FormGroup({});
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;
  minWidthDes: number = 600;
  minHeightDes: number = 650;
  textPresetVal: any
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<AddCountryComponent>,private JsCssLoaderService:JsCssLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any,private authService:AuthService){}
  // ngAfterViewInit(): void {
  //   this.initializeQuillEditor()
  //    this.textPresetVal = new Choices('#choices-text-preset-values',{
  //    items:this.data!=null?this.data.objectives.map((e:any)=>e.name):[]});
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
          this.textPresetVal = new Choices('#choices-text-preset-values',{
          items:this.data!=null?this.data.objectives.map((e:any)=>e.name):[]});
    } catch (error) {
      console.error('Error loading CSS or scripts:', error);
    }
  }
  goals: string[] = []; // Track goals here
  ngOnInit(): void {
    this.createForm();

  }
  // @ViewChild('goalsInput') goalsInput: ElementRef;
  // addGoal(event: KeyboardEvent): void {
  //   const input = this.goalsInput.nativeElement as HTMLInputElement;
  //   const value = input.value.trim();

  //   if (value && !this.goals.includes(value)) {
  //     this.goals.push(value);
  //     input.value = ''; // Clear the input field
  //   }
  // }

  // removeGoal(index: number): void {
  //   this.goals.splice(index, 1);
  // }

  createForm(){
    if(this.data){
      this.form = this.service.formBuilder.group({
        Title:[this.data.title,[Validators.required]],
       // Description:[this.data.description,[Validators.required]],
        ImageFile:[this.data.imagePath,[Validators.required]],
        subTitle:[this.data.subTitle,[Validators.required]],
        imageDes:[this.data.imageDesPath,[Validators.required]],
      });
    }else{
      this.form = this.service.formBuilder.group({
        Title:['',[Validators.required]],
       // Description:['',[Validators.required]],
        ImageFile:[null,[Validators.required]],
        subTitle:['',[Validators.required]],
        imageDes:[null,[Validators.required]],
      });
    }
  }
  get subTitle(){
    return this.form.controls['subTitle'];
  }
  get Title(){
    return this.form.controls['Title'];
  }
  get imageDes(){
    return this.form.controls['imageDes'];
  }
  get ImageFile(){
    return this.form.controls['ImageFile'];
  }
  // get Description(){
  //   return this.form.controls['Description'];
  // }
  fileIn:File;
  fileInR:File;

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(this.isImageFile(file)){

      this.checkImageDimensions(file).then((dimensions) => {
        const [width, height] = dimensions;
        if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
          this.fileIn=file;
          this.ImageFile.setValue(file.name)
        } else {
          this.fileIn=null;
          this.ImageFile.setValue('')
          // this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
          this.service.toastService.error(`تأكد من أن أبعاد الصورة لا تقل عن: ${this.minWidthProgram} × ${this.minHeightProgram} بكسل.`);

        }
      })
      .catch((error) => {
        console.error('Error checking image dimensions:', error);
      });


  }else{
    this.fileIn=null;
    this.ImageFile.setValue('')
    alert('Please select a valid image file.');
  }
  }

  onFileSelectedImageDes(event: any):void{
    const file = (event.target as HTMLInputElement).files?.[0];
    if(this.isImageFile(file)){
      this.checkImageDimensions(file).then((dimensions) => {
        const [width, height] = dimensions;
        if (width >= this.minWidthDes && height >= this.minHeightDes) {
          this.fileInR=file;
          this.imageDes.setValue(file.name)
        } else {
          this.fileInR=null;
          this.imageDes.setValue('')
          // this.service.toastService.error(`Image dimensions must be at least ${this.minWidthDes} * ${this.minHeightDes} pixels.`);
          this.service.toastService.error(`تأكد من أن أبعاد الصورة لا تقل عن: ${this.minWidthProgram} × ${this.minHeightProgram} بكسل.`);

        }
      })
      .catch((error) => {
        console.error('Error checking image dimensions:', error);
      });

  }else{
    this.fileInR=null;
    this.imageDes.setValue('')
    alert('Please select a valid image file.');
  }
  }

  submit() {
    const values = this.textPresetVal.getValue();


    // this.service.printFormValues(this.form);
    var post=document.getElementsByClassName('ql-editor')[0].innerHTML;
    if(post=='<p><br></p>'){
      this.service.toastService.error('ادخل وصف البرنامج مطلوب');
      return;
    }
   // if(this.form.valid){
        const formData = new FormData();
        for (let i = 0; i < values.length; i++) {
          const json = JSON.stringify({
            'id':0,
            'name':values[i].value
          });
          formData.append(`objectives[${i}]`, json);
        }
        formData.append('Title', this.form.value.Title);
        formData.append('Description',post);
        formData.append('ImageFile', this.fileIn);
        //
        formData.append('CreatedBy',this.authService.currentUser().id);
        formData.append('SubTitle',this.form.value.subTitle);
        formData.append('ImageDesFile',this.fileInR);
        if(this.data){
          formData.append('id', this.data.id);
          this.service.programsService.update(formData).subscribe(res=>{
            if(res.statusCode=='200'){
                  this.service.toastService.success(res.message);
                  this.closeDialog();
                }else{
                  this.service.toastService.error(res.message);
                 // this.closeDialog();
                }

            // next:(response:ResponseVM)=>{
            //   if(response.statusCode==200){
            //     this.service.toastService.success(response.message);
            //     this.closeDialog();
            //   }else{
            //     this.service.toastService.error(response.message);
            //   }
            // },
            // error:(error)=>{
            //   this.service.toastService.error(error);
            // }
          })
        }else{
          formData.append('id', '0');
        this.service.programsService.add(formData).subscribe({
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
    // }else{
    //   this.service.toastService.error("افحص كل المطلوب");
    // }
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
