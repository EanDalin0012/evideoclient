import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SlidebarComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SlidebarComponent
  ]
})
export class VLayoutModule { }
