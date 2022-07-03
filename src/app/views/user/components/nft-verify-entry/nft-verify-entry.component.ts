import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NodeService } from 'src/app/shared/services/node.service';
import { UIStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'app-nft-verify-entry',
  templateUrl: './nft-verify-entry.component.html',
  styleUrls: ['./nft-verify-entry.component.scss']
})
export class NftVerifyEntryComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  @Output() closeThread = new EventEmitter();
  @Input() title: any = 'LuxuryNFT';

  accountName = 'No Account';

  pageInView = '';

  constructor(
    private $ui: UIStateService, 
    private $loc: Location,
    private ns$: NodeService) {
  }
  
  ngOnInit() {
    this.subscriptions.add(
      this.$ui.$secRoute.subscribe(title => {
        console.log(title)
        if (title !== 'fh')
          this.pageInView = this.$ui.nftPageInView;
        else 
          this.pageInView = `${ this.title } Wizard`;
      }));

      this.subscriptions.add(
        this.ns$._accountHashAvailable$.subscribe(v  => {
            let acc = this.ns$.currentAccount();
            console.log('New', acc)
            if (acc) {
              if ('name' in acc) {
                this.accountName = acc.name;
              }
            }
        }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  requestMainAreaClose() {
    this.closeThread.emit();
  }

  goBack() {
    this.$loc.back();
  }
}
