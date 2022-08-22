import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController, ToastController } from '@ionic/angular';
import { monthlyExpense } from '../interface/monthlyExpense';
import { AddingMenuService } from '../Service/adding-menu.service';
import { BillingService } from '../Service/billing.service';
import { MonthlyExpenseService } from '../Service/monthly-expense.service';

@Component({
  selector: 'app-monthly-expense',
  templateUrl: './monthly-expense.page.html',
  styleUrls: ['./monthly-expense.page.scss'],
})
export class MonthlyExpensePage implements OnInit {
  defaultPage = true;
  selectedOption = '';
  newEntryTab = false;
  fetchList = false;
  showPicker = false;
  selectedName = '';
  dateValue = '';
  paymentStatus;
  responseArray = [];
 gasRate  = '';
  modalName = '';
  monthlyExpense: monthlyExpense = {
    water: {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    },
    oil: {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    },
    soda: {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    },
    rice: {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    },
    gas: {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    },
    masala: {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    }
  };
  responseTable = [];
  FetchedTotal = 0;
  usageGas: any;
  @ViewChild(IonModal) modal: IonModal;


  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  segmentValue: string;
  constructor(private _location: Location, public toastController: ToastController, public loadingController: LoadingController, private expenseService: MonthlyExpenseService, private billingService: BillingService) { }


  ngOnInit() {
    this.newEntryTab = true;
    this.fetchList = false;
  }

  previous() { this._location.back(); }

  expenseTab(options: any) {
    console.log(options);
    this.selectedOption = options;
    if (this.selectedOption == 'gas') {
      this.modalName = this.selectedOption;
      this.resetWater();
    } else if (this.selectedOption == 'oil') {
      this.modalName = this.selectedOption;
      this.segmentValue = 'newEntryOil';
      this.resetWater();
    } else if (this.selectedOption == 'water') {
      this.modalName = this.selectedOption;
      this.segmentValue = 'newEntryWater';
      this.resetWater();
    } else if (this.selectedOption == 'soda') {
      this.modalName = this.selectedOption;
      this.segmentValue = 'newEntrySoda';
      this.resetWater();
    } else if (this.selectedOption == 'rice') {
      this.modalName = this.selectedOption;
      this.segmentValue = 'newEntryRice';
      this.resetWater();
    }else if (this.selectedOption == 'masala') {
      this.modalName = this.selectedOption;
      this.segmentValue = 'newEntryMasala';
      this.resetWater();
    }

  }

  resetWater() {
    this.monthlyExpense.water = {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    };
    this.usageGas = "";
    this.monthlyExpense.oil = {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    }
    this.monthlyExpense.soda = {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    };
    this.monthlyExpense.rice = {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    };
    this.monthlyExpense.gas =  {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    };
    this.monthlyExpense.masala =  {
      dateOfExpense: "",
      noOfItems: "",
      ratePerItem: "",
      totalAmt: ""
    };
    this.selectedName = '';
    this.dateValue = '';
  }

  newEntry(opt: any) {
    if (opt == 'new') {
      this.newEntryTab = true;
      this.fetchList = false;
    } else if (opt == 'fetchList') {
      this.newEntryTab = false;
      this.fetchList = true;
    }
  }

  active(event: any) {
    this.usageGas = event.detail.value;
    console.log(event.detail.value);
  }

  dateChanged(value: any) {
    this.selectedName = value.split('T')[0];
  }

  async fetch(type: any) {
    this.responseTable = [];
      if (this.selectedName) {
        const loading = await this.loadingController.create({
          message: 'Please wait..',
        });
        await loading.present();
        console.log(this.selectedName.split("-")[0] + '-' + this.selectedName.split("-")[1] + "-*");
        let body = {
          dateOfPurchase: this.selectedName.split("-")[0] + '-' + this.selectedName.split("-")[1] + "-*",
          expenseType: type
        }
        this.expenseService.fetchMonthlyExpense(body).subscribe(async data => {
          console.log(data);
          this.loadingController.dismiss();
          if (data['Code'] == 'Success') {
            const toast = await this.toastController.create({
              message: 'Data Saved Successfully..',
              duration: 4000,
              color: 'success',
            });
            toast.present();
            this.responseTable = data['result'];
            this.calculateFetchedTotal(this.responseTable);
          } else if (data['Code'] == 'Error') {
            const toast = await this.toastController.create({
              message: 'No record found for the given date..',
              duration: 5000,
              color: 'danger',
            });
            toast.present();
          }
        })
      } else {
        const toast = await this.toastController.create({
          message: 'Please fill the required fields.',
          duration: 5000,
          color: 'danger',
        });
        toast.present();
      }
  }

  calculateFetchedTotal(arrayVal: any) {
    var total = 0;
    for (let data of arrayVal) {
      total = total + parseInt(data['MonthlyExpense']['totalAmt']);
    }
    this.FetchedTotal = total;
  }

  async save(type: any) {
  
      if (this.selectedName && this.monthlyExpense[type].noOfItems && this.monthlyExpense[type].ratePerItem && this.monthlyExpense[type].totalAmt) {
        const loading = await this.loadingController.create({
          message: 'Please wait..',
        });
        await loading.present();
        let body = {
          expenseType: type,
          dateOfPurchase: this.selectedName,
          noOfQuantity: this.monthlyExpense[type].noOfItems,
          ratePerItem: this.monthlyExpense[type].ratePerItem,
          totalAmt: this.monthlyExpense[type].totalAmt,
          usageFor : type == 'gas' ? this.usageGas : ''
        }
        console.log(body);
        this.expenseService.addMonthlyExpense(body).subscribe(async data => {
          console.log(data);
          this.loadingController.dismiss();
          if (data['Code'] == 'Success') {
            const toast = await this.toastController.create({
              message: 'Data Saved Successfully..',
              duration: 4000,
              color: 'success',
            });
            toast.present();
            this.resetWater();
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.selectedName = '';
    this.dateValue = '';
    this.responseTable = [];
  }

  confirm() {
    this.modal.dismiss('', 'confirm');
    this.selectedName = '';
    this.dateValue = '';
    this.responseTable = [];
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  calculateTotal(noOfItems, rate, type) {
    if(type == 'masala'){
      this.monthlyExpense[type]['totalAmt'] = this.monthlyExpense.masala.ratePerItem;
    }else {
      if (noOfItems && rate) {
        this.monthlyExpense[type]['totalAmt'] = parseInt(noOfItems) * parseInt(rate);
      }
    }
    
  }

  segmentChanged(event) {
    this.segmentValue = event.detail.value;
    console.log(this.segmentValue);
  }

}
