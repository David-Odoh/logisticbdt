import { Component, HostListener, OnInit } from '@angular/core';
import { UIStateService } from '../../services/ui-state.service';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp';
import { stringToU8a, u8aToHex } from '@polkadot/util';

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { NodeService } from '../../services/node.service';
import { FormControl } from '@angular/forms';
import { Observable, EMPTY, startWith, map, Subscription } from 'rxjs';
import { Account } from '../contract/account';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {
  backgroundColor: string = "landing-gradient-red";
  showCustomizer = false;
  subscriptions: Subscription = new Subscription();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update Screen Width on Resize
    this.$UI_State.updateStoreWidth(event.target.innerWidth);
  }

  // ACCOUNTS
  public accountControl = new FormControl();

  public accounts: Account[] = [];

  public selectedAccount?: Account;

  public filteredAccounts: Observable<Account[]> = EMPTY;

  constructor(private $UI_State: UIStateService, private nodeService: NodeService) {
    // Remove code if you don't wish to retrieve colo from local storage
    // Or add more checks to ensure it is  a valid 'theme class' before assigning it
    let themeColor = localStorage.getItem('theme-color');
    if (themeColor) this.backgroundColor = themeColor;

    // this.extensionSetup();
  }

  ngOnInit() { 
    this.nodeService._accountReady$.subscribe(async (ready) => {
      if (ready) {
        this.nodeService.nodeState$.subscribe(_ns$ => {

          this.nodeService.getAccounts(_ns$).subscribe({
              next: (accounts) => this.setAccounts(accounts),
              error: console.error
          })
        })
      }
    })
  }

  changeBg(colorName: string) {
    console.log(colorName)
    this.backgroundColor = colorName;

    // Persist to Local Storage
    localStorage.setItem('theme-color', colorName)
  }

  toggleCustomizer() {
    this.showCustomizer = !this.showCustomizer;
  }

  private setAccounts(accounts: Account[]) {
    this.accounts = accounts;

    console.log('all accounts', this.accounts);

    this.filteredAccounts = this.filterAccounts(
        this.accountControl.valueChanges);

    this.selectLastAccount();
}

private filterAccounts(controlValueChanges$: Observable<string | Account>) {
    return controlValueChanges$.pipe(
        startWith(''),
        map((value: string | Account) => typeof value === 'string'
            ? value
            : value.name),
        map((name: string) => name
            ? this.accounts
                .filter(account => account.name
                    .toLowerCase()
                    .includes(name.toLowerCase()))
            : this.accounts.slice()
        ));
}

private selectFirstAccount() {
    if (this.accounts.length === 0) {
        return;
    }

    console.log('account', this.accounts[0]);
    this.accountControl.setValue(this.accounts[0]);
    this.selectAccount(this.accounts[0]);
}

private selectLastAccount() {
    if (this.accounts.length === 0) {
        return;
    }

    let lastIndex = this.accounts.length - 1;
    console.log('account', this.accounts[lastIndex]);
    this.accountControl.setValue(this.accounts[lastIndex]);
    this.selectAccount(this.accounts[lastIndex]);
}

public selectAccount(account: Account) {
    this.nodeService.selectAccount(account);
    this.selectedAccount = account;
}

public accountDisplayName(account: Account): string {
    return account?.name ?? '';
}

// public clearAccountSelector(event: Event, trigger: MatAutocompleteTrigger) {
//     this.accountControl.setValue('');
//     event.stopPropagation();
//     trigger.openPanel();
// }

}