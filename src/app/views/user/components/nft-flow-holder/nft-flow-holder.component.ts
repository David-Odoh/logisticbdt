import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'nft-flow-holder',
  templateUrl: './nft-flow-holder.component.html',
  styleUrls: ['./nft-flow-holder.component.scss']
})
export class NftFlowHolderComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  currentUrl: string = '';

  constructor(private router: Router, private $ui: UIStateService) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    this.subscriptions.add(
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) this.currentUrl = this.router.url;
    }));
  }

  requestToOpenNFTCreate(option: string) {
    if (this.currentUrl.includes('verify'))
      this.router.navigate(["/user/nft-verify/qr"]);
    else 
      this.router.navigate(["/user/nft-create/qr"]);

    // Display Info in Main Area
    this.$ui.updateNFTView(`Scan ${option}`);
    this.$ui.updateSecondaryRoute('qr');
    this.$ui.openInMainArea(option);
  }
}
