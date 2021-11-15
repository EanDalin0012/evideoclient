import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageScolling = new BehaviorSubject(0);
  currentMessageScolling = this.messageScolling.asObservable();

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private messageSourceNotification = new BehaviorSubject('default message');
  currentMessageNotification = this.messageSourceNotification.asObservable();


  private visitSource =  new BehaviorSubject<any>('');
  visitData = this.visitSource.asObservable();

  private visitSourceParamRoutorChange =  new BehaviorSubject<any>('');
  visitSourceParamRoutorChangeData = this.visitSourceParamRoutorChange.asObservable();

  private viewProductDetail =  new BehaviorSubject<any>('');
  viewProductDetailData = this.viewProductDetail.asObservable();

  private viewNewAccountClose =  new BehaviorSubject<any>('');
  viewNewAccountCloseData = this.viewNewAccountClose.asObservable();

  private messageActiveMenueSource = new BehaviorSubject('');
  ActiveMenueSource = this.messageActiveMenueSource.asObservable();


  private chageProfile =  new BehaviorSubject<any>('');
  chageProfileData = this.chageProfile.asObservable();

  sendMessageScolling(message: number) {
    console.log('sendMessageScolling', message);

    this.messageScolling.next(message);
  }

  sendMessageActiveMenueSource(message: string) {
    this.messageActiveMenueSource.next(message);
  }

  sendMessageNotification(message: string) {
    this.messageSourceNotification.next(message);
  }

  sendMessage(message: string) {
    this.messageSource.next(message);
  }

  visitMessage(message: any) {
    this.visitSource.next(message);
  }

  visitParamRouterChange(message: any) {
    this.visitSourceParamRoutorChange.next(message);
  }

  viewProductDetailMessage(message: any) {
    this.viewProductDetail.next(message);
  }

  viewNewAccountCloseMessage(message: any) {
    this.viewNewAccountClose.next(message);
  }

  chageProfileDataMessage(message: any) {
    this.chageProfile.next(message);
  }

  unsubscribeNewAccountClose() {
    this.viewNewAccountClose.complete();
  }

}
