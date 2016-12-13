import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { Badge, LocalNotifications, NativeStorage } from 'ionic-native';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      LocalNotifications.on('click', function(){
        Badge.decrease(1);
      })

      LocalNotifications.on('trigger', function(notification){
        Badge.increase(1);
      })

      LocalNotifications.on('schedule', function(notification) {
        console.log(notification);
        alert("Notification scheduled");
      })
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
