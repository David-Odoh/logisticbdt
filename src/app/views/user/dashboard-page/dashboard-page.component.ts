import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { NodeService } from 'src/app/shared/services/node.service';
import { UIStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  accountName = 'Welcome back!';
  subscriptions: Subscription = new Subscription();

  constructor(private ns$: NodeService, private router: Router, private $ui: UIStateService) { 
    this.subscriptions.add(
      this.ns$._accountHashAvailable$.subscribe(v  => {
          let acc = this.ns$.currentAccount();
          // console.log('New', acc)
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

  navigateTo(url: String) {
    if (url) {
      this.$ui.resetVariables();
      this.router.navigate([url]);
    }
  }
}
