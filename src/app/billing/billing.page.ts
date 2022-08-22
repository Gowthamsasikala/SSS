import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CheckboxCustomEvent, LoadingController, ToastController } from '@ionic/angular';
import { billing } from '../interface/billing';
import { AddingMenuService } from '../Service/adding-menu.service';
import { BillingService } from '../Service/billing.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {
  billing: billing = { itemPerRate: "", orderItem: "", orderQuantity: "", orderTotalAmt: "", orderAmt: "" }
  quantitys = [];
  itemPerRate: any;
  ordersArrayList = [];
  itemArray = [];
  canDismiss = false;
  presentingElement = null;
  searchKey: any;
  newItemArray = [];
  selected = false;
  menuItems: any;
  lastInsertedRecord = [];
  constructor(private _location: Location, public toastController: ToastController, public loadingController: LoadingController, private menuService: AddingMenuService, private billingService: BillingService) { }


  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.newItemArray = this.itemArray;
    for (let i = 1; i <= 30; i++) {
      this.quantitys.push(i);
    }
    this.menuService.getAllMenuItems().subscribe(data => {
        this.menuItems = data;
        for(let datas of this.menuItems){
          this.itemArray.push(datas['menuItems']);
        }
    })
  }

  previous() { this._location.back(); }

  onTermsChanged(event) {
    console.log(event);
    if(event){
      this.billing.orderItem = event.itemName;
      this.billing.itemPerRate = event.itemRate;
      this.canDismiss = true;
    }else{
      this.canDismiss = false;
    }
  }

  itemSelection(event){
    console.log(event);
    console.log(event.detail.value);
    var val = (event.detail.value).split('-')[1];
    this.itemPerRate = val;
  }

  searchKeyword(event){
     this.selected = false;
     this.newItemArray = [];
    requestAnimationFrame(() => {
      this.itemArray.forEach((item) => {
        const shouldShow = item.itemName.toLowerCase().indexOf(event.toLowerCase()) > -1;
        shouldShow ? this.newItemArray.push(item) : '';
      });
    });
    console.log(this.newItemArray);
  }

  quantity(event: any){
    console.log(this.billing.orderQuantity);
    if(this.billing.itemPerRate){
       this.billing.orderAmt = parseInt(event.detail.value) * parseInt(this.billing.itemPerRate);
    }
  }

  delete(index){
    console.log(index);
    this.ordersArrayList.splice(index, 1);
  }

  async addOrderList() {
    if (this.billing.orderItem && this.billing.orderQuantity) {
      var obj = {
        itemName: this.billing.orderItem.split('-')[0],
        itemQuantity: this.billing.orderQuantity,
        itemAmt: this.billing.orderAmt,
      }
      this.ordersArrayList.push(obj);
      this.billing = { itemPerRate: "", orderItem: "", orderQuantity: "", orderTotalAmt: "", orderAmt: ""};
      this.calculateOrderTotal();
    } else {
      const toast = await this.toastController.create({
        message: 'Please fill the required fields.',
        duration: 5000,
        color: 'danger',
      });
      toast.present();
    }
  }

  clearSearchKey(){
    this.searchKey = '';
    this.canDismiss = false;
  }

  calculateOrderTotal(){
    var total = 0;
    for(let data of this.ordersArrayList){
      total = total + data['itemAmt'];
    }
    this.billing.orderTotalAmt = total;
  }

  reset(){
    this.billing = { itemPerRate: "", orderItem: "", orderQuantity: "", orderTotalAmt: "", orderAmt: ""};
  }

 async fetchLastRecord(){
    let yourDate = new Date();
    const loading = await this.loadingController.create({
      message: 'Please wait..',
    });
    await loading.present();
    let body = {
     currentDate : yourDate.toISOString().split('T')[0]
    }
    this.billingService.fetchLastRecords(body).subscribe(async data => {
      if(data['Code'] == 'Success'){
        this.loadingController.dismiss();
        let count = 0;
        for(let datas of data['result']){
           if(count <= 5){
            datas['billing']['orderItems'] = JSON.parse(datas['billing']['orderItems']);
            this.lastInsertedRecord.push(datas);
           }
           count++;
        }
        console.log(this.lastInsertedRecord);
        const toast = await this.toastController.create({
          message: 'Record Fetched successfully..',
          duration: 5000,
          color: 'success',
        });
        toast.present();
      }else {
        this.loadingController.dismiss();
        const toast = await this.toastController.create({
          message: 'No record found for the current date.',
          duration: 5000,
          color: 'danger',
        });
        toast.present();
      }
    })
  }

 async save(){
    let yourDate = new Date();
    if(this.ordersArrayList && this.ordersArrayList.length > 0){
      const loading = await this.loadingController.create({
        message: 'Please wait..',
      });
      await loading.present();
        let body = {
          orderId : '',
          orderDate : yourDate.toISOString().split('T')[0],
          orderTotalAmt : this.billing.orderTotalAmt,
          orderItems : JSON.stringify(this.ordersArrayList)
        }
  this.billingService.addBilling(body).subscribe(async data => {
    if(data['Code'] == 'Success'){
      this.loadingController.dismiss();
      this.reset();
      this.ordersArrayList = [];
      const toast = await this.toastController.create({
        message: 'Bill created successfully..',
        duration: 5000,
        color: 'success',
      });
      toast.present();
    }
  })
    }else {
      const toast = await this.toastController.create({
        message: 'Kindly add the item',
        duration: 5000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
