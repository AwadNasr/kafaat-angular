import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ActivatedRoute } from '@angular/router';
import { JsCssLoaderService } from '../../services/js-css-loader.service';
declare const Quill: any;

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})

export class AddReportComponent implements OnInit , AfterViewInit{
  repoert:any;
  form:FormGroup = new FormGroup({});
  id:number;
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service:MainDashoardService,private route:ActivatedRoute,private JsCssLoaderService:JsCssLoaderService) {

    route.params.subscribe(params=>{
      this.id=params['id']
    })

  }
  // ngAfterViewInit(): void {


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
    this.getReportDate();
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
  //  if(this.activity){
  //   document.getElementsByClassName('ql-editor')[0].innerHTML=this.activity.description
  //  }

  }
//   private initializeQuillEditor(data:String) {

//     const toolbarOptions = [
//       // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       // [{ "font": [12,15,20,25,30] }],
//       ['bold', 'underline'],
//       // ['blockquote', 'code-block'],
//       // [{ 'header': 1 }, { 'header': 2 }],
//       // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       // [{ 'script': 'sub' }, { 'script': 'super' }],
//       // [{ 'indent': '-1' }, { 'indent': '+1' }],
//       // [{ 'direction': 'rtl' }],
//       // [{ 'size': ['small', false, 'large', 'huge'] }],
//       // [{ 'color': ['red','white','black','yellow','blue','green'] }, { 'background': ['red','white','black','yellow','blue','green'] }],
//       // // [{ 'align': ['rtl','ltr'] }],
//       // ['image', 'video'],
//       // ['clean']
//     ];
//  this.editorElement.nativeElement.innerHTML=data
//     const quill = new Quill(this.editorElement.nativeElement, {
//       modules: {
//         toolbar: toolbarOptions
//       },
//       theme: 'snow'
//     });

//   }
  getReportDate(){
    this.service.activityService.getٌReport(this.id).subscribe(response=>{
      if(response.statusCode=='200'){

        //this.initializeQuillEditor(response.data);
        this.repoert=response;

        // console.log();
        //this.data=response.data;
      }else{
        //this.initializeQuillEditor("");
        this.service.toastService.error(response.message);
      }
    });
  }

  submit(){
    var report=document.getElementsByClassName('ql-editor')[0].innerHTML;
    if(report=='<p><br></p>'){
      this.service.toastService.error('ادخل وصف المنشط مطلوب');
      return;
    }
      this.service.activityService.addReport({id:this.id,report:report}).subscribe(response=>{
        if(response.statusCode=='200'){
          this.service.toastService.success('تم اضافة البيانات')
        }else{
          this.service.toastService.error(response.message);
        }
      });
  }
  back(){
    this.service.router.navigateByUrl("/admin/details-activity/"+this.id);
  }
}
