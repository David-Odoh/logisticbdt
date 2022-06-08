import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'nft-create-entry',
  templateUrl: './nft-create-entry.component.html',
  styleUrls: ['./nft-create-entry.component.scss']
})
export class NftCreateEntryComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  @Output() closeThread = new EventEmitter();
  @Input() title: any = 'Product';

  pageInView = '';

  constructor(private $ui: UIStateService, private $loc: Location) {
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
