import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { ToastrService } from 'ngx-toastr';
declare const Quill: any;
@Component({
  selector: 'app-manashet-details-shared-page',
  templateUrl: './manashet-details-shared-page.component.html',
  styleUrls: ['../contact-us/contact-us.component.css','./manashet-details-shared-page.component.css']
})
export class ManashetDetailsSharedPageComponent implements AfterViewInit,OnInit {
  @ViewChild('editor', { static: true }) editorElement: ElementRef;

 id:number
 items:any[]
 item:any
 isDropDownVisible:boolean[];

constructor(private toaster:ToastrService,private route:ActivatedRoute,private service:KafaatMainService) {
  this.route.params.subscribe(prams=>{
    this.id=prams['id']
  })

}
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.service.postsActivity.getAll(this.id).subscribe(response=>{

      if(response.statusCode=='200'){
        console.log("data",response.data);

        this.items=response.data;
        this.isDropDownVisible=[]
        for(var i=0;i>this.items.length;i++){
          this.isDropDownVisible.push(false);
        }
      }
    })
  }

  edit(id:number){
  this.item=this.items.find(x=>x.id==id)
  document.getElementsByClassName('ql-editor')[0].innerHTML=this.item.description;
  this.hideList()
  }
  deleteItem(id:number){
  this.service.postsActivity.delete(id).subscribe(response=>{
    if(response.statusCode=='200'){
      this.service.toastService.success(response.message)
      this.loadData();
    }else{
      this.service.toastService.error(response.message);
    }
  })
  }

  private initializeQuillEditor() {
    const toolbarOptions = [
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      // [{ 'font': [] }],
      ['bold', 'underline'],
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],
      // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      // [{ 'script': 'sub' }, { 'script': 'super' }],
      // [{ 'indent': '-1' }, { 'indent': '+1' }],
      // [{ 'direction': 'rtl' }],
      // [{ 'size': ['small', false, 'large', 'huge'] }],
      // // [{ 'color': [] }, { 'background': [] }],
      // // [{ 'align': [] }],
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

  hideList(){


  this.isDropDownVisible= this.isDropDownVisible.map(x=>false)


  }

  ngAfterViewInit(): void {

    this.initializeQuillEditor()
    window.onclick=(event)=>{

      const listItemElements = document.getElementsByClassName("listItem");
const eventTarget = event.target as Element;

let isContained = false;


const listItemArray = Array.from(listItemElements);
if (listItemArray.includes(eventTarget)) {
  isContained = true;
}

if (!isContained) {

  this.hideList()

    }
  }
  }


  toggleOptions(i:number){
    this.isDropDownVisible[i] = !this.isDropDownVisible[i];
  }

  addPost(){
    var post=document.getElementsByClassName('ql-editor')[0].innerHTML;
    if(post!='<p><br></p>'){
      if(this.item && this.item.id){
        this.service.postsActivity.update({id:this.item.id,Description:post,ParticipantId:this.service.authService.currentUser().id,
          ActivityId:this.id}).subscribe(response=>{
            if(response.statusCode=="200"){
              document.getElementsByClassName('ql-editor')[0].innerHTML='<p><br></p>';
              this.toaster.success(response.message);
              this.loadData();
              this.item=null
            }else{
              this.service.toastService.error(response.message);
            }
          })
      }else{
        this.service.postsActivity.add({id:0,Description:post,ParticipantId:this.service.authService.currentUser().id,
          ActivityId:this.id}).subscribe(response=>{
            if(response.statusCode=="200"){
              document.getElementsByClassName('ql-editor')[0].innerHTML='<p><br></p>';
              this.service.toastService.success(response.message);
              this.loadData();
            }else{
              this.service.toastService.error(response.message);
            }
          })
      }

    }

  }

  checkPost(id:any){

    return this.service.authService.currentUser().id==id;
  }
  checkLogin():boolean{
    try{
      this.service.authService.currentUser().id;
      console.log(this.service.authService.currentUser().id);


      return true;
    }catch(e){

      return false;
    }
  }

}
