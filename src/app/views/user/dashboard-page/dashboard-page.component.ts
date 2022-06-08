import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { NodeService } from 'src/app/shared/services/node.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
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
