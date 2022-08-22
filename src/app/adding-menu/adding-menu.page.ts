import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { addingMenu } from '../interface/addingMenu';
import { AddingMenuService } from '../Service/adding-menu.service';

@Component({
  selector: 'app-adding-menu',
  templateUrl: './adding-menu.page.html',
  styleUrls: ['./adding-menu.page.scss'],
})
export class AddingMenuPage implements OnInit {
  addLabel = 'ADD MENU';
  public addingMenu: addingMenu = { itemName: "", itemRate: "", activeStatus: "" }
  constructor(private _location: Location, public toastController: ToastController, public loadingController: LoadingController, private addMenuService: AddingMenuService) { }

  ngOnInit() {
  }

  active(event: any) {
    this.addingMenu.activeStatus = event.detail.value;
    console.log(event.detail.value);
  }

  previous() { this._location.back(); }

  async addMenu() {
    if (this.addingMenu.itemName && this.addingMenu.itemRate && this.addingMenu.activeStatus) {
      const loading = await this.loadingController.create({
        message: 'Item is being added, Please wait..',
      });
      await loading.present();

      // api req to save the item to db
      var body = {
        itemName: this.addingMenu.itemName,
        itemRate: this.addingMenu.itemRate,
        activeStatus: this.addingMenu.activeStatus == "true" ? true : false
      }
      this.addMenuService.addMenu(body).subscribe(async data => {
        console.log(data);
        this.loadingController.dismiss();
        this.addingMenu = { itemName: "", itemRate: "", activeStatus: "" };
        const toast = await this.toastController.create({
          message: 'Item has been added Successfully.',
          duration: 5000,
          color: 'success',
        });
        toast.present();
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
}
