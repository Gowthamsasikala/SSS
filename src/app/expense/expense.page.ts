import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CheckboxCustomEvent, LoadingController, ToastController } from '@ionic/angular';
import { ExpenseService } from '../Service/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {

  productName: any;
  productRate: any;
  addToLists = [];
  userName: any;
  totalAmt = 0;
  showPicker =false;
  selectedName = '';
  dateValue : any;
  constructor(private _location: Location, public toastController: ToastController, public loadingController: LoadingController, public router: Router, private expenseService: ExpenseService) { }
 
  ngOnInit() {
    
  }

  previous() { 
    this._location.back(); 
  }

  selectUser(event){
    this.userName = event.detail.value;
  }

 async addToList(){
    if(this.productName && this.productRate && this.userName){
      let yourDate = new Date();
      let val = {
        productName : this.productName,
        productRate : this.productRate,
        userType : this.userName,
        expenseDate : this.selectedName,
        productId : ''
      }
      console.log(val);
      this.addToLists.push(val);
      this.calculateTotal();
      this.reset();
    }else {
      const toast = await this.toastController.create({
        message: 'Please fill the required fields.',
        duration: 5000,
        color: 'danger',
      });
      toast.present();
    }
  }

  reset(){
    this.productName = '';
    this.productRate = '';
    this.userName = '';
  }

  calculateTotal(){
     this.totalAmt = 0;
    for(let val of this.addToLists){
     this.totalAmt = this.totalAmt + parseInt(val['productRate'])
    }
  }

  dateChanged(value: any) {
    this.selectedName = value.split('T')[0];
    console.log(this.selectedName);
  }

 async save(){
    if(this.addToLists.length > 0){
      const loading = await this.loadingController.create({
        message: 'Item is being added, Please wait..',
      });
      await loading.present();
       this.expenseService.addExpense(this.addToLists).subscribe(async data => {
       this.loadingController.dismiss();
       this.reset();
       this.addToLists = [];
        const toast = await this.toastController.create({
          message: 'Expense has been added Successfully.',
          duration: 5000,
          color: 'success',
        });
        toast.present();
       })
    }else {
      const toast = await this.toastController.create({
        message: 'Please add the expenses',
        duration: 5000,
        color: 'danger',
      });
      toast.present();
    }
  }

}
