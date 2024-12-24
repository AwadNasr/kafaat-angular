import { Component, OnInit ,Inject} from '@angular/core';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-pop-up',
  templateUrl: './confirm-pop-up.component.html',
  styleUrls: ['./confirm-pop-up.component.css']
})
export class ConfirmPopUpComponent implements OnInit{
constructor(private service:MainDashoardService,public dialogRef: MatDialogRef<ConfirmPopUpComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,) {
    
}
closeDialog(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
}


submit(){
  this.dialogRef.close();
  this.data.submit()
}
}

