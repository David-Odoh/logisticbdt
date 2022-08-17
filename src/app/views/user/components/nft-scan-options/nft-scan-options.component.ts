import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'nft-scan-options',
  templateUrl: './nft-scan-options.component.html',
  styleUrls: ['./nft-scan-options.component.scss']
})
export class NftScanOptionsComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  @ViewChild('searchbox') input: any;
  @Input() title: any = 'LBDT';
  currentUrl: string = '';

  constructor(private router: Router, private $ui: UIStateService, private $loc: Location) {
  }

  ngOnInit(): void { 
    this.currentUrl = this.router.url;

    this.subscriptions.add(
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) this.currentUrl = this.router.url;
    }));
  }

  requestToOpenNFTCreate(option: string) {

    // Display Info in Main Area
    this.$ui.updateNFTView(`Scan ${option}`);
    this.$ui.openInMainArea(option);
    
    if (option === 'NFC') {
      if (this.currentUrl.includes('verify'))
        this.router.navigate(["/user/nft-verify/nfc"]);

      else if (this.currentUrl.includes('transfer'))
        this.router.navigate(["/user/nft-transfer/nfc"]);
        
      else
        this.router.navigate(["/user/nft-create/nfc"]);
      this.$ui.updateSecondaryRoute('nfc');
    } 
    
    else {
      if (this.currentUrl.includes('verify'))
        this.router.navigate(["/user/nft-verify/qr"]);

      else if (this.currentUrl.includes('transfer'))
        this.router.navigate(["/user/nft-transfer/qr"]);

      else
        this.router.navigate(["/user/nft-create/qr"]);
      this.$ui.updateSecondaryRoute('qr');
    }

  }

  goBack() {
    this.$loc.back();
  }
}
