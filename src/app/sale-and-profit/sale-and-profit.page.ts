import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { salesProfit } from '../interface/saleProfit';
import { ReportService } from '../Service/report.service';

@Component({
  selector: 'app-sale-and-profit',
  templateUrl: './sale-and-profit.page.html',
  styleUrls: ['./sale-and-profit.page.scss'],
})
export class SaleAndProfitPage implements OnInit {
  segmentValue = 'newEntry';
  showPicker = false;
  selectedName = '';
  dateValue = '';
  sales: salesProfit = {
    dateOfSale: "",
    cash: "",
    paytm: "",
    phonepay: "",
    card: "",
    expense: "",
    profit: ""
  }
  dailyProfitResponse: any;
  onlinePayment = 0;
  constructor(private _location: Location, public toastController: ToastController, public loadingController: LoadingController, private salesService: ReportService) { }

  previous() { this._location.back(); }

  ngOnInit() {
    // newEntry
    this.segmentValue = 'newEntry';
  }

  reset() {
    this.sales = {
      dateOfSale: "",
      cash: "",
      paytm: "",
      phonepay: "",
      card: "",
      expense: "",
      profit: ""
    }
    this.selectedName = '';
  }

  segmentChanged(event) {
    this.segmentValue = event.detail.value;
    console.log(this.segmentValue);
  }

  dateChanged(value: any) {
    this.selectedName = value.split('T')[0];
    this.sales.dateOfSale = this.selectedName;
  }

  async save() {
    if (this.segmentValue && this.sales.cash && this.sales.phonepay && this.sales.profit) {
      const loading = await this.loadingController.create({
        message: 'Please wait..',
      });
      await loading.present();
      let body = {
        dateOfSale: this.selectedName,
        cash: this.sales.cash,
        card: this.sales.card,
        paytm: this.sales.paytm,
        phonePay: this.sales.phonepay,
        profit: this.sales.profit,
        expense : this.sales.expense
      }
      this.salesService.dailySalesProfit(body).subscribe(async data => {
        console.log(data);
        this.loadingController.dismiss();
        if (data['Code'] == 'Success') {
          const toast = await this.toastController.create({
            message: 'Data Saved Successfully..',
            duration: 4000,
            color: 'success',
          });
          toast.present();
          this.reset();
        }
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Please fill the required fields.',
        duration: 5000,
        color: 'danger',
      });
      toast.present();
    }
  }

  async fetch() {
    if(this.selectedName){
      this.dailyProfitResponse = {}
      const loading = await this.loadingController.create({
        message: 'Please wait..',
      });
      await loading.present();
      let body = {
        dateOfSale: this.selectedName
      }
      this.salesService.fetchDailySalesProfit(body).subscribe(async data => {
        console.log(data);
        this.loadingController.dismiss();
        if (data['Code'] == 'Success') {
          this.dailyProfitResponse = data['result'][0]['dailySales'];
          this.onlinePayment = this.dailyProfitResponse['paytm'] == null ? this.dailyProfitResponse['phonePay'] :parseInt(this.dailyProfitResponse['paytm']) +parseInt(this.dailyProfitResponse['phonePay']);
          const toast = await this.toastController.create({
            message: 'Data fetched Successfully..',
            duration: 4000,
            color: 'success',
          });
          toast.present();
          this.reset();
        }
      });

    }else {
      const toast = await this.toastController.create({
        message: 'Please fill the required fields.',
        duration: 5000,
        color: 'danger',
      });
    }
  }

}
