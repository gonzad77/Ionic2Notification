import {Injectable} from "@angular/core";
import { DaysModel } from "./days.model";
import { LocalNotifications , NativeStorage, Badge } from 'ionic-native';

@Injectable()
export class NotificationService {
  days : Array<DaysModel> = new Array<DaysModel>();

   constructor() {
     this.days.push(
       {title: 'Sunday', id: 0},
       {title: 'Monday', id: 1},
       {title: 'Tuesday', id: 2},
       {title: 'Wednesday', id:3},
       {title: 'Thursday', id:4},
       {title: 'Friday', id:5},
       {title: 'Saturday', id:6}
     );
     Badge.set(0);
   }

   getDays(){
     return this.days;
   }

   scheduleNotification(name, date, frecuency){
     let env = this;
     NativeStorage.getItem('id')
     .then(function(notificationId){
       //If an id is stored
       env.scheduleById(name, date, frecuency, notificationId);
     }, function (){
       //If it is the first notification, id will be 0
       env.scheduleById(name, date, frecuency, 0);
     });
    }

   scheduleById(name, date, frecuency, id){
     LocalNotifications.schedule({
       id: id,
       title: 'ionicThemes',
       text: name,
       at: date,
       every: frecuency
     });
     NativeStorage.setItem('id', (id + 1));
   }
 }
