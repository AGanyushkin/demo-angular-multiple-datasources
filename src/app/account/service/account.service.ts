import {Account} from "../domain/Account";
import {from, merge, Observable, switchMap, map, toArray, mergeMap, filter} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AccountResponse} from "./domain/account-response";
import {environment} from "../../../environments/environment";
import {AccountStatus} from "./domain/account-status";
import {MessageResponse} from "./domain/message-response";

@Injectable()
export class AccountService {
  constructor(private readonly httpClient: HttpClient) {
  }

  getListOfAccounts(): Observable<Account[]> {
    return merge(
      this.getListOfCustomers(),
      this.getListOfAdmins()
    )
      .pipe(
        this.loadOnlineStatus(),
        this.filterIfOnline(),
        this.loadMessages(),
        toArray(),
      )
  }

  private getListOfCustomers(): Observable<Account> {
    return this.httpClient.get<AccountResponse[]>(environment.apiHost+'/account?size=7')
      .pipe(
        this.accountResponseToAccount(),
        this.injectColor('blue'),
      )
  }

  private getListOfAdmins(): Observable<Account> {
    return this.httpClient.get<AccountResponse[]>(environment.apiHost+'/account?size=3')
      .pipe(
        this.accountResponseToAccount(),
        this.injectColor('orange'),
      )
  }

  private accountResponseToAccount() {
    return switchMap((accounts: AccountResponse[]) => from(accounts))
  }

  private injectColor(color: string) {
    return map((account: AccountResponse): Account => {
      let acc = account as Account
      acc.color = color
      return acc
    })
  }

  private loadOnlineStatus() {
    return mergeMap((account: Account) =>
      this.httpClient.get<AccountStatus>(environment.apiHost+"/status?accountId="+account.id)
        .pipe(
          map((accountStatus: AccountStatus): Account => {
            account.status = accountStatus.status
            return account
          })
        )
    )
  }

  private loadMessages() {
    return mergeMap((account: Account) =>
      this.httpClient.get<MessageResponse[]>(environment.apiHost+"/message?size=3&ownerId="+account.id)
        .pipe(
          map((messages: MessageResponse[]): Account => {
            account.messages = messages
            return account
          })
        )
    )
  }

  private filterIfOnline() {
    return filter((account: Account) => account.status === 'ONLINE')
  }
}
