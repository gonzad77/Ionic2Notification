import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NotificationService } from './notification.service';

import { DaysModel } from './days.model';

import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chosenHours: number;
  chosenMinutes: number;
  notifyTime: any;
  days: Array<DaysModel>;
  daysSelected: any;
  name: string;

  constructor(
    public navCtrl: NavController,
    public notificationService: NotificationService
  ){
    //this is the time to show in the date picker
    this.notifyTime = moment(new Date()).format();
    //this is the selected time
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();
    this.days = this.notificationService.getDays();
  }

  ScheduleNotification(){
    let currentDate = new Date();
    debugger;
    for(let day of this.daysSelected){

      let date = new Date();
      let dayDifference = day - currentDate.getDay();
      if(dayDifference < 0){
        dayDifference = dayDifference + 7; //the day is in the following week
      }
      //This line sets the day i.e.: if dayDifference==1 the notification will be for tomorrow
      date.setHours(date.getHours() + (24 * (dayDifference)));
      //This line sets the hour chosen
      date.setHours(this.chosenHours);
      date.setMinutes(this.chosenMinutes);
      date.setSeconds(0);

      this.notificationService.scheduleNotification(this.name, date, 'week');
    }
  }

  timeChange(time){
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }
}
