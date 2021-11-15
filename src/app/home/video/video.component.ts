
import { LOCAL_STORAGE } from './../../v-share/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../../v-share/service/http.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Utils } from 'src/app/v-share/util/utils.static';
import { EncryptionUtil } from 'src/app/v-share/util/encryption-util';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  private baseUrl: string = '';
  videoSrc: string = '';
  jsonData: any;
  indexOfelement = 0;

  src = '';
  vdTitle = '';
  vdParts: any[] = [];

  vdPartId = 0;
  OFFSET = 0;

  autoplay = '';
  auto = '';
  check = false;

  constructor(
    private http: HTTPService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {
    this.baseUrl = environment.bizServer.server;
   }

  ngOnInit(): void {
    this.check = Utils.getSecureStorage(LOCAL_STORAGE.Auto_Play);

    if(this.check === true) {
      this.autoplay = 'autoplay';
      this.auto = 'auto';
    }

    this.vdTitle = 'Lung Sne Chong Pov Bosaba​';
    for (let index = 0; index < 40; index++) {
      if (index == 39) {
        this.vdParts.push(
          {
            part: index + 1,
            title: this.vdTitle,
            con: 'End'
          },
        );
      } else {
        this.vdParts.push(
          {
            part: index + 1,
            title: this.vdTitle,
            con: 'Contnue'
          },
        );
      }


    }
    this.vdPartId = this.vdParts[0].part;

    const data = Utils.getSecureStorage(LOCAL_STORAGE.VideoView);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);

    this.src = this.baseUrl + '/unsecur/api/image/reader/v0/read/'+this.jsonData.resourceId;

    if(this.jsonData) {
      this.inquiryVD(this.jsonData.id);
    }

  }

  videoEnd() {
    this.indexOfelement = this.indexOfelement +1;
    if(this.vdParts.length > this.indexOfelement) {
      this.videoSrc = this.baseUrl+"/unsecur/api/resource/vd/v0/vdSource/"+this.vdParts[this.indexOfelement].sourceVdId;
      this.vdPartId = this.vdParts[this.indexOfelement].part;
      console.log(this.videoSrc, this.vdPartId);
    }
  }

  changePlayVD(indexOfelement: number, item:any) {
    console.log(item);
    this.indexOfelement = indexOfelement;
    this.vdPartId = item.part;
    this.videoSrc = this.baseUrl+"/unsecur/api/resource/vd/v0/vdSource/"+item.sourceVdId;
  }

  inquiryVD(id: number) {
    console.log('inquiryVD', id);

    const data = {
      vdId: id
    };

    const api =  '/unsecur/api/resource/v0/read';
    console.log('api', api);

    this.http.Post(api, data).then(res => {
      console.log('res inquiryVD', res);
      if (res.result.responseCode === '200') {
        this.vdParts = res.body;
        if (this.vdParts.length > 0) {
          this.indexOfelement = 0;
          this.videoSrc = this.baseUrl+"/unsecur/api/resource/vd/v0/vdSource/"+this.vdParts[0].sourceVdId;
        }
      }
    });
  }

  checkValue(event:any) {
    console.log(event.target.checked);
    Utils.setSecureStorage(LOCAL_STORAGE.Auto_Play, event.target.checked);
    if(event.target.checked === true) {
      this.autoplay = 'autoplay';
      this.auto = 'auto';
    } else {
      this.autoplay = 'autoplay';
      this.auto = 'auto';
    }
  }

  showErrMsg(msgKey: string, value?: any){
  let message = '';
  switch(msgKey) {
    case 'Invalid_Name':
      message = this.translate.instant('movieType.message.movieTypeRequired');
      break;
    case 'Invalid_SubVd_Id':
      message = this.translate.instant('serverResponseCode.label.inValidMovieTypeIdWithValue', {value: value});
      break;

    case 'Invalid_Vd_ID':
      message = this.translate.instant('serverResponseCode.label.inValidMovieTypeId');
      break;
    case 'unSelectRow':
      message = this.translate.instant('common.message.unSelectRow');
      break;
    case '500':
      message = this.translate.instant('serverResponseCode.label.serverError');
      break;
    default:
      message = this.translate.instant('serverResponseCode.label.unknown');
      break;
  }
  this.toastr.error(message, this.translate.instant('common.label.error'),{
    timeOut: 5000,
  });
}

}
