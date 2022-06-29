import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UIStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'nft-scan-options',
  templateUrl: './nft-scan-options.component.html',
  styleUrls: ['./nft-scan-options.component.scss']
})
export class NftScanOptionsComponent implements OnInit {
  @ViewChild('searchbox') input: any;
  @Input() title: any = 'LBDT';

  constructor(private router: Router, private $ui: UIStateService, private $loc: Location) {
  }

  ngOnInit(): void { }

  requestToOpenNFTCreate(option: string) {

    // Display Info in Main Area
    this.$ui.updateNFTView(`Scan ${option}`);
    this.$ui.openInMainArea(option);
    
    if (option === 'NFC') {
      this.router.navigate(["/user/nft-create/nfc"]);
      this.$ui.updateSecondaryRoute('nfc');
    } 
    
    else {
      this.router.navigate(["/user/nft-create/qr"]);
      this.$ui.updateSecondaryRoute('qr');
    }

  }

  goBack() {
    this.$loc.back();
  }
}
