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

  acc: any = null;

  constructor(private ns$: NodeService) { 
    this.subscriptions.add(
      this.ns$._accountHashAvailable$.subscribe(v  => {
          this.acc = this.ns$.currentAccount();
          console.log('New', this.acc)
          if (this.acc) {
            if ('name' in this.acc) {
              this.accountName = this.acc.name;
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