import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { ResponseVM } from '../../core/models/response-vm';

@Component({
  selector: 'app-profile-delete-account-pop-up',
  templateUrl: './profile-delete-account-pop-up.component.html',
  styleUrls: ['./profile-delete-account-pop-up.component.css']
})
export class ProfileDeleteAccountPopUpComponent {
  constructor(private adminService:MainDashoardService,private service:KafaatMainService,public dialogRef: MatDialogRef<ProfileDeleteAccountPopUpComponent>) {}
  closeDialog(): void {
    this.dialogRef.close();
  }


  deleteAccount() {
    let _email = this.service.authService.currentUser().email;
    let model = {email:_email};
    this.service.profileService.deleteAccount(model).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.adminService.toastService.success(res.message);
          this.service.authService.logout();
          this.closeDialog();
        }else{
          this.adminService.toastService.warning(res.message);
        }
      },error:(error)=>{
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Use the error message from the 'error' property
        } else if (error.message) {
          errorMessage = error.message; // Use the 'message' property if available
        }
        this.adminService.toastService.error(errorMessage);
      }
    });
  }
}
