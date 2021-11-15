import { EncryptionUtil } from './../../v-share/util/encryption-util';
import { HTTPResponseCode, LOCAL_STORAGE } from './../../v-share/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { HTTPService } from './../../v-share/service/http.service';
import { DataService } from './../../v-share/service/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/v-share/util/utils.static';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseUrl: string = '';

  public lstFiles: any[] = [];
  public searchFilterList: any[] = [];
  public lstFileList: any[] = [];
  public lstSearchList: any[] = [];

  selector: string = '.main-panel';
  scrolledLoadData = false;

  fileSidebarToggle = false;

  // message:any;
  videoType:any;
  lstSubVideoType: any[] = [];
  rowData: any;
  subVideoType:any;
  OFFSET = 0;
  lstVideo: any[] = [];
  rowDataVideo: any;

// /unsecur/api/image/reader/v0/read/'+ params.data?.resourceId
  constructor(
    private dataService: DataService,
    private titleService: Title,
    private hTTPService: HTTPService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private router: Router) {
      this.baseUrl = environment.bizServer.server + '/unsecur/api/image/reader/v0/read/';
    }

  ngOnInit() {

    this.lstFiles = [
      { id: 1, name: 'All Projects' },
      { id: 2, name: 'Office Management' },
      { id: 3, name: 'Video Calling App' },
      { id: 4, name: 'Hospital Administration' },
      { id: 5, name: 'Virtual Host' }
    ]
    this.searchFilterList = [
      { id: 1, name: 'Drama' },
      { id: 2, name: 'Movies' },
      { id: 3, name: 'Histories' }
    ]

    $(document).on('click', '#file_sidebar_toggle', function () {
      $('.file-wrap').toggleClass('file-sidebar-toggle');
    });

    $(document).on('click', '.file-side-close', function () {
      $('.file-wrap').removeClass('file-sidebar-toggle');
    });



    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange({currentUrl: url[3], message: this.videoType});
    this.dataService.ActiveMenueSource.subscribe(message => {
      this.videoType = message;
      console.log(this.videoType);

      this.titleService.setTitle('Video-Type:'+this.videoType?.name);
      this.dataService.visitParamRouterChange({currentUrl: url[3], message: this.videoType});
    });

    this.inquiry();
    this.doRequest(0);
  }

  // search filter in files name
  searchBName(searchValue: any) {
    this.searchFilterList = this.lstFiles.filter(res => {
      return res.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }


  // search filter in files and docs
  searchText(searchValue: any) {
    this.lstSearchList = this.lstFileList.filter(res => {
      return res.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  doRequest(OFFSET: number) {
    const api = '/unsecur/web/video/api/v0/read';
    const jsonData = {
      LIMIT: 5,
      OFFSET: OFFSET
    };
    console.log(jsonData);

    this.hTTPService.Post(api, jsonData).then(response => {
      if(response.result.responseCode === HTTPResponseCode.Success) {
       console.log('response', response.body);
        this.lstVideo = this.lstVideo.concat(response.body);
        this.rowDataVideo = this.lstVideo;
        console.log('rowDataVideo', this.rowDataVideo);

      } else {
        this.showErrMsg(response.result.responseMessage);
      }
    });
  }

  test = 1;
  onScrollDown(item: any) {
    console.log('onScrollDown!!', item);
    this.scrolledLoadData = true;
    console.log('scrolled!!', this.lstSearchList.length);
    console.log('this.test!!', this.test);
    console.log(this.OFFSET);

    this.OFFSET = this.OFFSET + 5;
    console.log(this.OFFSET);
    this.doRequest(this.OFFSET);
  }

  onScrollUp(item:any) {
    console.log('scrolled!!', item);

  }

  view(item: any) {
    console.log(item);

    const jsonString = JSON.stringify(item);
    const encryptString = EncryptionUtil.encrypt(jsonString.toString()).toString();
    Utils.setSecureStorage(LOCAL_STORAGE.VideoView, encryptString);

    this.router.navigate(['/home/vd']);


  }

   // Get Employee  Api Call
  inquiry() {
    const api = '/unsecur/web/videoSubType/api/v0/read';
    this.hTTPService.Get(api).then(response => {
      if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
      } else {
        this.lstSubVideoType = response.body;
        this.rowData =this.lstSubVideoType;
        console.log('rowData', this.rowData);
      }
    });
  }

  clickSubVideo(item: any) {
    console.log('item', item);
    this.subVideoType = item;
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
