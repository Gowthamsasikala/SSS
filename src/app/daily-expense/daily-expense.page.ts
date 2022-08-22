import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpenseService } from '../Service/expense.service';

@Component({
  selector: 'app-daily-expense',
  templateUrl: './daily-expense.page.html',
  styleUrls: ['./daily-expense.page.scss'],
})
export class DailyExpensePage implements OnInit {

  showPicker = false;
  selectedName = '';
  dateValue: any;
  userName: any;
  responseArray = [];
  totalAmt = 0;
  constructor(private _location: Location, public toastController: ToastController, public loadingController: LoadingController, public router: Router, private expenseService: ExpenseService) { }


  ngOnInit() {
    
  }

  expense(){
  this.router.navigateByUrl("/folder/expense");
  }

  previous() { 
    this._location.back(); 
  }

  selectUser(event){
   console.log(event.detail.value);
   this.userName = event.detail.value;
  }

  dateChanged(value: any) {
    console.log(value);
    console.log(value.split('T')[0]);
    this.selectedName = value.split('T')[0];
  }

async fetchRecord() {
     if(this.selectedName && this.userName){
       var body = {
        'userType' : this.userName,
        'expenseDate': this.selectedName
       }
       const loading = await this.loadingController.create({
        message: '',
      });
      await loading.present();
      this.responseArray = [];
         this.expenseService.fetchExpenseRecord(body).subscribe(async data => {
           if(data['Code'] == 'Success'){
              this.loadingController.dismiss();
              for(let val of data['result']){
                this.responseArray.push(val['Expense']);
              }
              this.calculateTotal();
           }else {
              this.loadingController.dismiss();
              const toast = await this.toastController.create({
                message: 'No Expenses for the selected date',
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

  calculateTotal(){
    this.totalAmt = 0;
    for(let val of this.responseArray){
      this.totalAmt = this.totalAmt + parseInt(val['productRate']);
    }
  }
}
