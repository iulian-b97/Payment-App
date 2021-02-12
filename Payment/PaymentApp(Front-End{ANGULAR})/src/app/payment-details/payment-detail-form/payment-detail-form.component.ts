import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit 
{

  //Injectie de dependenta pentru fisierul "payment-detail.service.ts"
  constructor(public service:PaymentDetailService, private toastr:ToastrService) { }

  ngOnInit(): void { }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.paymentDetailId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm)
  {
    this.service.postPaymentDetail().subscribe(
      res => {
        //Apelam componenta de resetare a functiei
        this.resetForm(form);
        this.toastr.success('Submited successfully', 'Payment Detail Register');
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm)
  {
    this.service.putPaymentDetail().subscribe(
      res => {
        //Apelam componenta de resetare a functiei
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'Payment Detail Register');
      },
      err => { console.log(err); }
    );
  }

  //Componenta de resetare a functiei
  resetForm(form:NgForm)
  {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
