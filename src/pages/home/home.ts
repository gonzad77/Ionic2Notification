import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LocalNotifications, Badge } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    Badge.set(0);
  }

  Notificate(){
    LocalNotifications.schedule({
      id: 1,
      title: 'ionicThemes',
      text: 'Single Notification',
    });
    Badge.increase(1);
  }

}
