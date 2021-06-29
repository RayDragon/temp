import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HolidayService } from '../services/holiday.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  hide = false;

  /**
   * signInForm should contain the following Form control
   * 1. userName -> validate email, required.
   * 2. password -> required
   */

  signInForm: FormGroup;

  constructor(private holidayServiceObj: HolidayService, private snackBar: MatSnackBar, private route: Router, ) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      userName: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  get userName(){
    return this.signInForm.get('userName');
  }
  get password() {return this.signInForm.get('password');}


  /**
   * On click signIn button should call validate()
   * The validate should use the signIn function in HolidayService
   * If response is {status:1} then navigate to dashboard
   * Otherwise display "Invalid password" using snackbar
   */
  validate() {
    this.holidayServiceObj.signIn(this.userName.value, this.password.value)
      .subscribe(x=>{
        if(x.status == 1) {
          this.holidayServiceObj.isAuthenticated = true;
          return this.route.navigateByUrl('dashboard');
        }
        return this.snackBar.open("Invalid password");
      });
  }

}
