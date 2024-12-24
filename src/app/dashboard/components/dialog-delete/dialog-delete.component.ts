import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserCategory } from '../../services/user-category.service';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent  implements OnInit{
  form:FormGroup = new FormGroup({});
constructor(private service:MainDashoardService,public dialogRef: MatDialogRef<DialogDeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,) {
    
}
closeDialog(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
  this.createForm();
}
createForm(){
  this.form = this.service.formBuilder.group({
    id:[this.data.id,[Validators.required]],
    name:[this.data.name,[Validators.required]],
  });
}
get name(){
  return this.form.controls['name'];
}

submit(){
  this.dialogRef.close();
  this.data.submit()
}
}
