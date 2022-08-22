import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { identity } from 'rxjs';
import { login } from '../interface/login';
import { LoginService } from '../Service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginVariable: login = { email: "", password: "", emailID: "", passwords: "", confirmPasswords: "", phoneNumber: "", userName: "" };
  public loginTypes = 'login';
  currentLoggedInUser: any;
  constructor(private _location: Location, public toastController: ToastController, public loadingController: LoadingController, private loginService: LoginService) { }


  ngOnInit() {
    const type = localStorage.getItem('loginType');
    console.log(type);
    if (type == null) {
      this.loginTypes = 'login';
    } else {
      this.loginTypes = type;
      this.currentLoggedInUser = JSON.parse(localStorage.getItem('userInfo'));
    }
  }

  loginType(type: any) {
    this.loginTypes = type;
  }

  logout() {
    this.loginTypes = 'login';
    this.currentLoggedInUser = {};
    localStorage.removeItem('userInfo');
    localStorage.removeItem('loginType');
  }

  async loginCheck() {
    if (this.loginVariable.email && this.loginVariable.password) {
      const loading = await this.loadingController.create({
        message: 'Please wait..',
      });
      await loading.present();
      var body = {
        emailId: this.loginVariable.email,
        password: this.loginVariable.password
      }
      this.loginService.login(body).subscribe(async data => {
        this.loadingController.dismiss();
        if (data['Code'] === 'Error') {
          const toast = await this.toastController.create({
            message: 'Invalid Username or Password.',
            duration: 2000,
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'Logged in Successfully',
            duration: 2000,
          });
          toast.present();
          this.currentLoggedInUser = data['result'][0].UserInfo;
          localStorage.setItem('userInfo', JSON.stringify(this.currentLoggedInUser));
          localStorage.setItem('loginType', 'loggedin');
          this.loginTypes = 'loggedin';
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

  async signUp() {
    if (this.loginVariable.userName && this.loginVariable.emailID && this.loginVariable.phoneNumber && this.loginVariable.passwords && this.loginVariable.confirmPasswords) {
      if (this.checkPassword()) {
        var body = {
          "emailId": this.loginVariable.emailID,
          "password": this.loginVariable.passwords,
          "userName": this.loginVariable.userName,
          "phoneNumber": this.loginVariable.phoneNumber
        }
        const loading = await this.loadingController.create({
          message: 'Signing Up, Please wait..',
        });
        await loading.present();
        this.loginService.signup(body).subscribe(async data => {
        this.loadingController.dismiss();
           if(data['Code'] == 'Success'){
            const toast = await this.toastController.create({
              message: 'Signup has been created successfully.',
              duration: 4000,
              color: 'success',
            });
            toast.present();
            this.loginTypes = 'login';
           }else if(data['Code'] == 'Error'){
            const toast = await this.toastController.create({
              message: 'EmailID already exist or unable to create a signup',
              duration: 4000,
              color: 'danger',
            });
            toast.present();
           }
        })
      } else {
        const toast = await this.toastController.create({
          message: 'Password Mismatch..!',
          duration: 3000,
          color: 'danger',
        });
        toast.present();
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Please fill the required fields.',
        duration: 5000,
        color: 'danger',
      });
      toast.present();
    }
  }

  checkPassword() {
    if (this.loginVariable.passwords === this.loginVariable.confirmPasswords) {
      return true;
    } else {
      return false;
    }
  }
}
