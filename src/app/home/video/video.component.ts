import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../../v-share/service/http.service';
import { Router } from '@angular/router';
import { DataService } from '../../v-share/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  private baseUrl: string = '';

  src = '';
  vdTitle = '';
  vdParts: any[] = [];

  vdPartId = 0;

  constructor(
    private router: Router,
    private dataService: DataService,
    private http: HTTPService
  ) {
    this.baseUrl = environment.bizServer.server;
   }

  ngOnInit(): void {
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
    this.inquiryVD();
  }

  videoEnd() {
    this.src = 'http://localhost:8080/unsecur/api/read/vd/v0/5';
  }

  changePlayVD(item:any) {
    console.log(item);
    this.vdPartId = item.part;
    this.src = 'http://localhost:8080/unsecur/api/resource/vd/v0/vdSource/'+item.part;
  }

  inquiryVD() {
    const data = {
      vdId: 1
    };

    const api = this.baseUrl + '/unsecur/api/resource/vd/v0/vd';
    console.log('api', api);

    this.http.Post(api, data, true).then(res => {
      console.log('res', res);
      if (res.result.responseCode === '200') {
        this.vdParts = res.body;
        if (this.vdParts.length > 0) {
          this.src = 'http://localhost:8080/unsecur/api/resource/vd/v0/vdSource/'+this.vdParts[0].id;
        }
      }
    });
  }
}
