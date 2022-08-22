import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpenseService } from '../Service/expense.service';

@Component({
  selector: 'app-myexpense',
  templateUrl: './myexpense.page.html',
  styleUrls: ['./myexpense.page.scss'],
})
export class MyexpensePage implements OnInit {
  currentLoggedInUser: any;
  isNotAuth = false;
  showPicker = false;
  selectedName = '';
  dateValue = '';
  productName= '';
  productRate = '';
  addToLists = [];
  totalAmt = 0 ;
  fetchtotalAmt = 0;
  segmentValue = '';
  fetchBySelection: any;
  responseArray = [];
  constructor(private _location: Location, public toastController: ToastController, public loadingController: LoadingController, private router: Router,private expenseService: ExpenseService) { }

  ngOnInit() {
    this.segmentValue = 'add';
    const type = localStorage.getItem('loginType');
    console.log(type);
    if (type == null) {
      this.router.navigateByUrl('/folder/login');
    } else {
      this.currentLoggedInUser = JSON.parse(localStorage.getItem('userInfo'));
      if(this.currentLoggedInUser['userName'] == 'Gowtham P'){
        this.isNotAuth = false;
      }else {
        this.isNotAuth = true;
      }
    }
  }

  previous() { this._location.back(); }

  async addToList(){
    if(this.productName && this.productRate && this.selectedName){
      let val = {
        productName : this.productName,
        productRate : this.productRate,
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
    this.selectedName = '';
  }

  calculateTotal(){
     this.totalAmt = 0;
    for(let val of this.addToLists){
     this.totalAmt = this.totalAmt + parseInt(val['productRate'])
    }
  }

  dateChangedForFetch(value: any) {
    if(this.fetchBySelection == 'date'){
      this.selectedName = value.split('T')[0];
      console.log(this.selectedName);
    }else if(this.fetchBySelection == 'month'){
      this.selectedName = value.split('T')[0].split("-")[1];
      console.log(this.selectedName);
    }else if(this.fetchBySelection == 'year'){
      this.selectedName = value.split('T')[0].split("-")[0];
      console.log(this.selectedName);
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
       this.expenseService.addMyExpense(this.addToLists).subscribe(async data => {
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


  async fetchBySelections(){
    if(this.fetchBySelection && this.selectedName){
      var body = {
       'expenseDate': this.fetchBySelection == 'date' ?  this.selectedName : this.fetchBySelection == 'month' ? "*-"+this.selectedName+"-*" : this.fetchBySelection == 'year' ? this.selectedName+"-*" : ""
      }
      const loading = await this.loadingController.create({
       message: '',
     });
     await loading.present();
     this.responseArray = [];
        this.expenseService.fetchMyExpenseRecord(body).subscribe(async data => {
          if(data['Code'] == 'Success'){
             this.loadingController.dismiss();
             for(let val of data['result']){
               this.responseArray.push(val['myDailyExpense']);
             }
             console.log(this.responseArray);
              this.calculateTotalAmt();
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

  segmentChanged(event) {
    this.segmentValue = event.detail.value;
    console.log(this.segmentValue);
  }


  selectdate(event){
    this.fetchBySelection = event.detail.value;
  }

  calculateTotalAmt(){
   for(let val of this.responseArray){
    this.fetchtotalAmt = this.fetchtotalAmt + parseInt(val['productRate']);
   }
  }
}
