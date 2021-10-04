import { Injectable } from '@angular/core';
import { Utils } from '../util/utils.static';
import { LOCAL_STORAGE, AESINFO } from '../constants/common.const';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  modal: any;
  data: any;
  private url: string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) { }

  public Post(api: string, TrClass: any, isAuth?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      let uri = "";
      let  httpOptionsObj = {};
      const dataBody = JSON.stringify(TrClass);
      const lang = Utils.getSecureStorage(LOCAL_STORAGE.I18N);
      // const date = moment().format('dddd, MMMM D, YYYY hh:mm:ss');
      const date = moment().format('YYYYMMDD hh:mm:ss');

      if (isAuth === true) {
        uri = api + '?lang=' + lang + '&date=202110012006:02:34';
        httpOptionsObj = {
          'Content-Type': 'application/json'
        };
      } else {
        const aesInfo: any = Utils.getSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME) || {};

        if (aesInfo && new Date().getTime() - aesInfo > environment.autoLogoutTime) {
          if (this.modal) {
            this.modal.close();
          }
          // this.modalService.alert(
          //   'For security reason, sessions end after 10 minutes of inactivity.\n' +
          //     'Your are required to sign in if  you wish to continue to use our services.\n' +
          //     'Thank you for using.',
          //     {
          //       callback: () => {
          //         $('kendo-dialog').remove();
          //         Utils.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
          //         Utils.removeSecureStorage(LOCAL_STORAGE.Authorization);
          //         this.router.navigate(['/login']);
          //       }
          //     }

          // );
        } else {
          $('div.loading').removeClass('none');
          $('body').removeClass('loaded');

          const authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
          const access_token = authorization.access_token;
          if (!access_token) {
            // this.modalService.alert(
            //    'Invalid Token',
            //   {
            //   modalClass: 'open-alert',
            //   btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
            //   callback: (res:any) => {
            //     Utils.removeSecureStorage(localStorage.Authorization);
            //     Utils.removeSecureStorage(localStorage.USER_INFO);
            //     this.router.navigate(['/login']);
            //   }
            // });
            return;
          }

          const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
          uri =  api + '?userId=' + userInfo.id + '&lang=' + lang + '&date='+date;
           httpOptionsObj = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token
          };

        }
      }

      this.data = this.httpClient.post(uri, dataBody,  {
        headers: new HttpHeaders(httpOptionsObj)
      }).subscribe( (res:any) => {
          const newAesInfo: any = Utils.getSecureStorage(AESINFO.STORE) || {};
          newAesInfo.timestamp = new Date().getTime();
          Utils.setSecureStorage(AESINFO.STORE, newAesInfo);
          $('body').addClass('loaded');
          $('div.loading').addClass('none');
          const result = res as any;
          if (result) {
            const responseData = result; //JSON.parse(result);
            const rawData = responseData;
            // const decryptData = JSON.parse(this.cryptoService.decrypt(String(rawData)));
            if (rawData.error != null) {
              reject();
              // this.message(result.error.message);
            } else {
              resolve(rawData);
            }
          } else {
            reject();
          }
      }, (error:any) => {
        console.log(error);
      });

    });
}

   public Get(api: string, obj?: any): Promise<any> {
    return new Promise((resolve, reject) => {

      $('div.loading').removeClass('none');
      $('body').removeClass('loaded');
      const userInfo = Utils.getSecureStorage(localStorage.USER_INFO);
      const lang = Utils.getSecureStorage(localStorage.I18N);
      const date = moment().format('dddd, MMMM D, YYYY hh:mm:ss');
      const uri = this.url + api + '?userId=' + userInfo.id + '&lang=' + lang + '&date='+date;
      const authorization = Utils.getSecureStorage(localStorage.Authorization);
      const access_token = authorization.access_token;

      // if (!access_token) {
      //   this.modalService.alert({
      //     content: 'fadfadf',
      //     btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
      //     callback: _res => {

      //     }
      //   });
      //   return;
      // }
      const headers = {
        Authorization: 'Bearer ' + access_token
      };

      console.log(uri);

      this.httpClient.get(uri, {headers}).subscribe( (rest:any) => {

        $('body').addClass('loaded');
        $('div.loading').addClass('none');
        const result = rest as any;
        console.log(rest);
        const responseData = result; //JSON.parse(result);
        const rawData = responseData.body;
        // const decryptData = JSON.parse(this.cryptoService.decrypt(String(rawData)));

        if (rawData.error != null) {
          this.message(result.error.message);
          reject();
        } else {
          resolve(rawData);
        }

      });
    });
  }

  private message(message: string) {
    // this.modalService.alert(
    //   '<h2>' + message + '</h2>',
    //   {
    //   modalClass: 'pop_confirm open-alert',
    //   btnText: 'Confirm',
    //   callback: (res: any) => {
    //     return false;
    //   }
    // });
  }

}
