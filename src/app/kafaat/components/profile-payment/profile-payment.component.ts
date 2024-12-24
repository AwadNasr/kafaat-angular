import { Component, OnInit } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { PagedResponse } from '../../core/models/paged-response';
import { ResponseVM } from '../../core/models/response-vm';
import { PaymentMethodTypes } from '../../core/static/payment-method-types';

@Component({
  selector: 'app-profile-payment',
  templateUrl: './profile-payment.component.html',
  styleUrls: ['./profile-payment.component.css']
})
export class ProfilePaymentComponent implements OnInit {
  userId:any;
  paymentList:any[] = [];
  paymenyImages:string[]=[
    '/assets/images/payment-method-visa.svg',
    '/assets/images/payment-method-pay.svg',
    '/assets/images/payment-method-mada.svg',
    '/assets/images/payment-method-stc-pay.svg',
  ];
  constructor(private service:KafaatMainService){}
  ngOnInit(): void {
    this.userId = this.service.authService.currentUser().id;
    this.getUserPayments();
  }
  getUserPayments(){
    this.service.paymentService.getAllForUser(this.userId).subscribe({
      next:(res:ResponseVM)=>{
          if(res.statusCode == 200){
            this.paymentList = res.data;
          }
      },
      error:(error)=>{
        this.service.toastService.error(error.message);
      }
    });
  }
  getImagePath(methodType:string){
    let path = "";
    if(methodType.toLocaleLowerCase() == PaymentMethodTypes.Visa.toLowerCase()){
      path = this.paymenyImages[0];
    }else if(methodType.toLocaleLowerCase() == PaymentMethodTypes.ApplePay.toLowerCase()){
      path = this.paymenyImages[1];
    } 
    else if(methodType.toLocaleLowerCase() == PaymentMethodTypes.Mada.toLowerCase()){
      path = this.paymenyImages[2];
    } 
    else if(methodType.toLocaleLowerCase() == PaymentMethodTypes.StcPay.toLowerCase()){
      path = this.paymenyImages[3];
    } 
    return path;
  }
  transformDateToArabic(date: string): string {
    date = date.slice(0,10);
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  
    const transformedDate = date.replace(/\d/g, (digit) => {
      return arabicDigits[parseInt(digit)];
    });
    let newTransformedDate = transformedDate.split('-');
    return `${newTransformedDate[0]}/${newTransformedDate[1]}/${newTransformedDate[2]}`;
  }
}
