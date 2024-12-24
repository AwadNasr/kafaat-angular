import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentList:any[]=[];

  ngOnInit(): void {
    this.setPaymentMethods();
  }

  selectPaymenyMethod(id:any){
    this.paymentList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
  }
  setPaymentMethods(){
    this.paymentList = [
      {id:1,imagePath:'/assets/images/payment-method-visa.svg',isSelected:true},
      {id:2,imagePath:'/assets/images/payment-method-pay.svg',isSelected:false},
      {id:3,imagePath:'/assets/images/payment-method-mada.svg',isSelected:false},
      {id:4,imagePath:'/assets/images/payment-method-stc-pay.svg',isSelected:false},
    ];
  }

  className:string = "";
  chaneInput(value:any){
    this.className = value.length > 0?'input-label-with-value':'input-label';
  }
}
