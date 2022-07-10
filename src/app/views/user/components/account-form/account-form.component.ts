import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, map, Observable, startWith, Subscription } from 'rxjs';
import { Account } from 'src/app/shared/components/contract/account';
import { NodeService } from 'src/app/shared/services/node.service';
import { DynamicFormComponent } from 'src/app/shared/widgets/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/shared/widgets/dynamic-form/models/field-config';

@Component({
  selector: 'account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  subscriptions: Subscription = new Subscription();

  busy = false;
  float_style = true;
  accountPK: string | null = null; 

  options = [];
  accounts: Account[] = [];
  //@ts-ignore
  @Input() selectedAccount: Account;

  //@ts-ignore
  accountForm: FormGroup;
  accountSelect = new FormControl('accountSelect');

  constructor(private $node: NodeService, private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    console.log(this.selectedAccount)
    
    this.accountForm = this.formBuilder.group({
      account: this.accountSelect
    });

    this.subscriptions.add(
      this.$node._accountReady$.subscribe(async (ready) => {
        if (ready) {
          this.$node.nodeState$.subscribe(_ns$ => {
            this.$node.getAccounts(_ns$).subscribe({
              next: (accounts) => this.setAccounts(accounts),
              error: console.error
            })
          })
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setAccounts(accounts: Account[]) {
    this.accounts = accounts;

    console.log(this.selectedAccount)

    this.selectAccount(this.selectedAccount);
}


private selectFirstAccount() {
    if (this.accounts.length === 0) {
        return;
    }

    this.accountForm.setValue({account: this.accounts[0]})
    this.selectAccount(this.accounts[0]);
}
  
public selectAccount(account: Account) {
  console.log(account)
    this.$node.selectAccount(account);

    this.accountForm.controls['account'].patchValue(account);
    this.decoyValue = account.name;
}

public accountDisplayName(account: Account): string {
    return account?.name ?? '';
}

 //@ts-ignore
 dropdown: boolean;
 //@ts-ignore
 decoyValue: string;

toggleSelect() {
  this.dropdown = !this.dropdown;
}

close() {
  if (this.dropdown) this.dropdown = false;
}

updateSelectValue(option: Account) {
  let answer = confirm("Are you sure you want to SWITCH ACCOUNT?");

  if (answer) {
    this.selectAccount(option)
    this.accountForm.controls['account'].patchValue(option);
    this.decoyValue = option.name;
  }
}

}
