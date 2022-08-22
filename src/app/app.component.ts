import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Home', url: '/folder/dashboard', icon: 'home' },
    { title: 'Billing', url: '/folder/billing', icon: 'document' },
    { title: 'Add Menu', url: '/folder/adding-menu', icon: 'grid' },
    { title: 'Report', url: '/folder/report', icon: 'copy' },
    { title: 'Expense', url: '/folder/daily-expense', icon: 'cash' },
    { title: 'Login', url: '/folder/login', icon: 'person' },
  ];
  currentLoggedInUser: any;
  constructor(private router: Router) { }
  ngOnInit(): void {
    const type = localStorage.getItem('loginType');
    console.log(type);
    if (type == null) {
      this.currentLoggedInUser.emailId = ''; 
    } else {
      this.currentLoggedInUser = JSON.parse(localStorage.getItem('userInfo'));
    }
  }
}
