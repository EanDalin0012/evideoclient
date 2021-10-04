import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VHomeComponent } from './v-home/v-home.component';
import { VideoComponent } from './video/video.component';
import { VShareModule } from '../v-share/v-share.module';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker' ;
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AllModulesData } from '../../assets/all-modules-data/all-modules-data';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VideoSidebarComponent } from './video-sidebar/video-sidebar.component';
import { ViewVideoComponent } from './view-video/view-video.component';

@NgModule({
  declarations: [
    VHomeComponent,
    VideoComponent,
    HomeComponent,
    VideoSidebarComponent,
    ViewVideoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    VShareModule,
    DataTablesModule,
    BsDatepickerModule,
    InfiniteScrollModule,
    InMemoryWebApiModule.forRoot(AllModulesData),
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    InfiniteScrollModule,
    VideoSidebarComponent,
    VideoComponent
  ]
})
export class HomeModule {
  constructor() {
    console.log('HomeModule');

  }
}
