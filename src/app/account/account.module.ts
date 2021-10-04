import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VAccountComponent } from './v-account/v-account.component';
import { AccountComponent } from './account/account.component';
import { AccountAddComponent } from './account-add/account-add.component';
import { AccountEditComponent } from './account-edit/account-edit.component';



@NgModule({
  declarations: [
    VAccountComponent,
    AccountComponent,
    AccountAddComponent,
    AccountEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
