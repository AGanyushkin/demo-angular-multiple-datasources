import {Component, OnInit} from '@angular/core';
import {Account} from "../domain/Account";
import {Observable} from "rxjs";
import {AccountService} from "../service/account.service";

@Component({
  selector: 'app-account-list-view',
  templateUrl: './account-list-view.component.html',
  styleUrls: ['./account-list-view.component.css']
})
export class AccountListViewComponent implements OnInit {
  accounts$: Observable<Account[]> | null = null

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accounts$ = this.accountService.getListOfAccounts()
  }
}
