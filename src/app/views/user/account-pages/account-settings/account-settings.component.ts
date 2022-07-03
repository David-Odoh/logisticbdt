import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NodeService } from 'src/app/shared/services/node.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  accountName = 'Welcome back!';
  subscriptions: Subscription = new Subscription();

  constructor(private ns$: NodeService) { 
    this.subscriptions.add(
      this.ns$._accountHashAvailable$.subscribe(v  => {
          let acc = this.ns$.currentAccount();
          console.log('New', acc)
          if (acc) {
            if ('name' in acc) {
              this.accountName = acc.name;
            }
          }
      })
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}