import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-join',
  templateUrl: './success-join.component.html',
  styleUrls: ['./success-join.component.css']
})
export class SuccessJoinComponent {
constructor(public dialogRef: MatDialogRef<SuccessJoinComponent>){}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
