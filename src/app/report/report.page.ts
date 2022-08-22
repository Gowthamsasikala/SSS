import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js'
import { ReportService } from '../Service/report.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit, AfterViewInit {

  public showPicker: Boolean = false;
  dateValue: any;
  selectedName: any;
  responseArray = [];
  segmentValue = 'table';
  @ViewChild('barChart') barChart: ElementRef;
  @ViewChild('barCanvas') barCanvas: ElementRef;
  bars: any;
  barChartNew: any;
  copy: any;
  subTotals = 0;
  constructor(private _location: Location, public toastController: ToastController, public loadingController: LoadingController, private recordService: ReportService) { }


  ngOnInit() {
    Chart.register(...registerables);
  }

  previous() { this._location.back(); }

  dateChanged(value: any) {
    console.log(value);
    console.log(value.split('T')[0]);
    this.selectedName = value.split('T')[0];
  }

  segmentChanged(event) {
    console.log(event.detail.value);
    this.segmentValue = event.detail.value;
    if (this.segmentValue == 'chart') {
      console.log(this.barChart);
      if (this.barChart) {
        // this.createBarChart();
        // this.barChartMethod();
      } else {
        this.barChart = this.copy;
        // this.createBarChart();
        // this.barChartMethod();
      }
    } else {
      console.log(this.barChart);
      this.copy = this.barChart;
    }
  }

  async fetchRecord() {
    var newArr = [{
        'itemName': '',
        'itemQuantity': '',
        'itemTotalAmt': ''
    }]
    if (this.selectedName) {
      var body = {
        orderDate: this.selectedName
      }
      const loading = await this.loadingController.create({
        message: 'Please wait..',
      });
      await loading.present();
      this.recordService.fetchBillingRecord(body).subscribe(async data => {
        console.log(data);
        if(data['Code'] == 'Success'){
           for(let datas of data['result']){
             var parsing = JSON.parse(datas['billing']['orderItems']);
              for(let items of parsing){
                let count = 0;
                 for(let k=0;k<newArr.length;k++){
                  if(items['itemName'] == newArr[k]['itemName']){ 
                    newArr[k].itemName =  items['itemName'];
                    newArr[k].itemQuantity = (parseInt(items['itemQuantity'])+parseInt(newArr[k]['itemQuantity'])).toString();
                    newArr[k].itemTotalAmt = (parseInt(items['itemAmt'])+parseInt(newArr[k]['itemTotalAmt'])).toString();
                  }else {
                    count++;
                  }
                 }
                 if(count == newArr.length){
                  let arr = {
                    itemName :  items['itemName'],
                    itemQuantity : items['itemQuantity'],
                    itemTotalAmt : items['itemAmt'].toString()
                  }
                  newArr.push(arr);
                  count = 0;
                 }
              }
           }
           var index, subTotal = 0;
           for(let i=0;i<newArr.length;i++){
               if(newArr[i]['itemName'] == ""){
                index = i;
               }else {
                // console.log(newArr[i]['itemTotalAmt']);
                // console.log(parseInt(newArr[i]['itemTotalAmt']));
                subTotal = subTotal + parseInt(newArr[i]['itemTotalAmt']);
               }
           }
           newArr.splice(index,1);
           this.responseArray = newArr;
           console.log(this.responseArray);
           this.subTotals = subTotal;
          //  console.log(subTotal);
        }else {
          this.responseArray = [];
          this.subTotals = 0;
          const toast = await this.toastController.create({
            message: 'No Record Found for the said date.',
            duration: 5000,
            color: 'danger',
          });
          toast.present();
        }
        this.loadingController.dismiss();
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

  ionViewDidEnter() {
    // this.createBarChart();
  }

  ngAfterViewInit() {
    
  }

  createBarChart() {
    console.log(this.bars);
    if (this.bars != null) {
      this.bars.destroy();
      console.log(this.barChart);
      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
          datasets: [{
            label: 'Viewers in millions',
            data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
            backgroundColor: 'rgb(38, 194, 129)',
            borderColor: 'rgb(38, 194, 129)',
            borderWidth: 1
          }]
        }
      });
    } else {
      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
          datasets: [{
            label: 'Viewers in millions',
            data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
            backgroundColor: 'rgb(38, 194, 129)',
            borderColor: 'rgb(38, 194, 129)',
            borderWidth: 1
          }]
        }
      });
    }
  }

  barChartMethod() {
    if (this.barChartNew != null) {
      this.barChartNew.destroy();
    } else {
      this.barChartNew = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
          datasets: [{
            label: '# of Votes',
            data: [200, 50, 30, 15, 20, 34],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        }
      });
    }
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.

  }
}
