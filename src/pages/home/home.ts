import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LocalNotifications, Badge, NativeStorage } from 'ionic-native';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chosenHours: number;
  chosenMinutes: number;
  notifyTime: any;
  days: any[];
  daysSelected: any;
  name: string;

  constructor(public navCtrl: NavController) {
    Badge.set(0);
    this.notifyTime = moment(new Date()).format();
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();
    this.days = [
      {title: 'Sunday', id: 0},
      {title: 'Monday', id: 1},
      {title: 'Tuesday', id: 2},
      {title: 'Wednesday', id:3},
      {title: 'Thursday', id:4},
      {title: 'Friday', id:5},
      {title: 'Saturday', id:6}
    ];
  }

  Notificate(){
    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let env = this;
    for(let day of this.daysSelected){

      let date = new Date();
      let dayDifference = day - currentDay;
      date.setHours(date.getHours() + (24 * (dayDifference)));
      date.setHours(this.chosenHours);
      date.setMinutes(this.chosenMinutes);
      date.setSeconds(0)

      NativeStorage.getItem('id')
      .then(function(notId){
        LocalNotifications.schedule({
          id: notId,
          title: 'ionicThemes',
          text: env.name,
          at: date,
          every: 'week'
        });
        console.log(date);
        NativeStorage.setItem('id', (notId + 1));
      }, function (error){
        LocalNotifications.schedule({
          title: 'ionicThemes',
          text: env.name,
          at: date,
          every: 'week'
        });
        NativeStorage.setItem('id', 1);
        console.log(date);
      });
      // Badge.increase(1);
      }

    }


  timeChange(time){
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }
}
