import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListViewComponent } from './account-list-view/account-list-view.component';
import {HttpClientModule} from "@angular/common/http";
import {AccountService} from "./service/account.service";


@NgModule({
  declarations: [
    AccountListViewComponent
  ],
  exports: [
    AccountListViewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule {
  constructor() {
  }
}
