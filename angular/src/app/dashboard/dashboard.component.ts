import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { HolidayService } from '../services/holiday.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // assign selected city to selectedCity
  selectedCity: string = null;

  // use year to display year
  year;

  // add month names in monthInAlphabets Array
  monthInAlphabets:Array<any> = ['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];

  // Use month index to get month in monthInAlphabets
  monthIndex = 0;

  // get cities and assign it to cities
  cities: Array<any>;

  constructor(public dialog: MatDialog, private holidayServiceObj: HolidayService, private route: Router) {

  }

  /**
   * Set the current month index to monthIndex and set current year to year
   * get cities
   */
  ngOnInit() {
    let date = new Date();
    this.monthIndex = date.getMonth();
    this.year = date.getFullYear();
    this.getCities();
  }

  /**
   *  To navigate month
   *  if "flag" is 0 which means that user click left arrow key <-
   *  if "flag" is 1 which means that user click right arrow key ->
   */
  navigationArrowMonth(flag) {
    this.monthIndex += [-1, 1][flag];
  
  }

  /**
   *  To navigate year
   *  if "flag" is 0 which means that user onclick left arrow key <-
   *  if "flag" is 1 which means that user onclick right arrow key ->
   */
  navigationArrowYear(flag) {
    this.year += [-1, 1][flag];
  }

  /**
   * To disable navigation for month
   * Return true to disable
   * Return false to enable
   */
  monthNavigatorValidation() {
  
    return null;
  }

  /**
   * To disable navigation for year
   * return true to disable
   * return false to enable
   */
  yearNavigatorValidation() {

    return null;
  }

  /**
   * Open Upload Dialog component and width as 500px
   * After dialog close upload the file and update holiday view component using monthComponentNotify() in HolidayService
   */
  uploadDialog() {
    let ref = this.dialog.open(UploadDialogComponent, {width: '500px'});
    ref.afterClosed().subscribe(
      data=>{
        if(data!=undefined) {
          this.holidayServiceObj.uploadFile(data).subscribe(x=>{
            this.holidayServiceObj.monthComponentNotify();
          })
        }
      }
    )

  }

  // Get cities list and assign the response value to cities
  getCities() {
    this.holidayServiceObj.getCities().subscribe((cities:any)=>{
      this.cities = cities;
    })
  }

  // signOut
  signOut() {
    this.holidayServiceObj.signOut();
  }


}
