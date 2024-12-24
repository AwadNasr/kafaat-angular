import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { KafaatMainService } from '../../services/kafaat-main.service';

@Component({
  selector: 'app-profile-logout-pop-up',
  templateUrl: './profile-logout-pop-up.component.html',
  styleUrls: ['./profile-logout-pop-up.component.css']
})
export class ProfileLogoutPopUpComponent {
  constructor(private service:KafaatMainService,public dialogRef: MatDialogRef<ProfileLogoutPopUpComponent>) {}
  closeDialog(): void {
    this.dialogRef.close();
  }

  logout() {
    // this.service.printFormValues(this.form);
    this.service.authService.logout();
    this.closeDialog();
  }
}
