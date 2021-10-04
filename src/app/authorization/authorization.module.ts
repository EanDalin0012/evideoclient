import { MyLogUtil } from './../v-share/util/my-log-util';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { VAuthorizationComponent } from './v-authorization/v-authorization.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { VShareModule } from '../v-share/v-share.module';



@NgModule({
  declarations: [
    LoginComponent,
    VAuthorizationComponent,

  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    VShareModule
  ]
})
export class AuthorizationModule {
 constructor() {
   MyLogUtil.log(
     'AuthorizationModule'
   );
 }


 }
