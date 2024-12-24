import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-club',
  templateUrl: './filter-club.component.html',
  styleUrls: ['./filter-club.component.css']
})
export class FilterClubComponent {
  constructor(private dialogRef: MatDialogRef<FilterClubComponent>){}
  closeDialog(): void {
    this.dialogRef.close();
  }
}
