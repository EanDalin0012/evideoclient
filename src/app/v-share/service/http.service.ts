import { Injectable, NgZone } from '@angular/core';
import { Utils } from '../util/utils.static';
import { LOCAL_STORAGE, AESINFO, HTTPResponseCode } from '../constants/common.const';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  modal: any;
  data: any;
  private baseUrl: string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private zone: NgZone,
    private dataService: DataService,
  ) {
    this.baseUrl = environment.bizServer.server;
  }

  public Post(api: string, TrClass: any): Promise<any> {
    return new Promise((resolve, reject) => {

        $('div.j83agx80').removeClass('none');
        // $('div.j83agx80').addClass('loading');

        const authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);

        let httpOptionsObj = {};
        httpOptionsObj = {
          'Content-Type': 'application/json'
        };
        if(authorization) {
          const access_token = authorization.access_token;
          httpOptionsObj = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token
          };

        }

        const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
        const lang = Utils.getSecureStorage(LOCAL_STORAGE.I18N);
        // const date = moment().format('dddd, MMMM D, YYYY hh:mm:ss');
        const date = moment().format('YYYYMMDD hh:mm:ss');
        // const stringDate = '20210910';
        // console.log('stringDate', moment(stringDate).format('dddd, MMMM D, YYYY'));

        // console.log(date);
        let userId = 0;
        if(userInfo) {
          userId = userInfo.id;
        }
        const uri = this.baseUrl + api + '?userId=' + userId + '&lang=' + lang + '&date='+date;

        const dataBody = JSON.stringify(TrClass);
        // const encryptionData = this.cryptoService.encrypt(dataBody);
        // const requestData = {
        //   body: encryptionData.toString()
        // };

        this.data = this.httpClient.post(uri, dataBody, {headers: httpOptionsObj}).subscribe( (res:any) => {
            const newAesInfo: any = Utils.getSecureStorage(AESINFO.STORE) || {};
            newAesInfo.timestamp = new Date().getTime();
            Utils.setSecureStorage(AESINFO.STORE, newAesInfo);
            $('div.j83agx80').removeClass('loading');
            $('div.j83agx80').addClass('none');

            $('body').addClass('loaded');
            $('div.loading').addClass('none');

            const result = res as any;
            if (result) {
              const responseData = result; //JSON.parse(result);

              if (!responseData) {
                reject();
                // this.message(result.error.message);
              } else {
                resolve(responseData);
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

      $('div.j83agx80').removeClass('none');
      $('body').removeClass('loaded');
      const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
      const lang = Utils.getSecureStorage(LOCAL_STORAGE.I18N);
      const date = moment().format('dddd, MMMM D, YYYY hh:mm:ss');

      let userId = 0;
      if(userInfo) {
        userId = userInfo.id;
      }

      const uri = this.baseUrl + api + '?userId=' + userId + '&lang=' + lang + '&date='+date;
      const authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);

      let headers = {};
      if(authorization) {
        const access_token = authorization.access_token;
        headers = {
          Authorization: 'Bearer ' + access_token
        };
      }


      this.httpClient.get(uri, {headers}).subscribe( (rest:any) => {
        $('div.j83agx80').removeClass('loading');
        $('div.j83agx80').addClass('none');

        $('body').addClass('loaded');
        $('div.loading').addClass('none');

        const result = rest as any;
        const responseData = result; //JSON.parse(result);
        // const decryptData = JSON.parse(this.cryptoService.decrypt(String(rawData)));

        if (!responseData) {
          //this.showErrMsg(responseData.result.message);
          reject();
        } else {
          resolve(responseData);
        }

      }, error => console.log('oops', error));
    });
  }

  showErrMsg(msgKey: string){
    let message = '';
    switch(msgKey) {
      case 'sessionExpired':
        message = this.translate.instant('serverResponseCode.label.sessionExpired');
        break;
      case '500':
        message = this.translate.instant('serverResponseCode.label.serverError');
        break;
      default:
        message = this.translate.instant('serverResponseCode.label.unknown');
        break;
    }
    this.toastr.error(message, "Error",{
      timeOut: 5000,
    });
  }

}
