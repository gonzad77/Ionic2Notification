import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LocalNotifications } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  Notificate(){
    LocalNotifications.schedule({
      id: 1,
      title: 'ionicThemes',
      text: 'Single Notification',
    });
  }

}
