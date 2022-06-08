import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UIStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'nft-flow-holder',
  templateUrl: './nft-flow-holder.component.html',
  styleUrls: ['./nft-flow-holder.component.scss']
})
export class NftFlowHolderComponent implements OnInit {

  constructor(private router: Router, private $ui: UIStateService) { }

  ngOnInit(): void {
  }

  requestToOpenNFTCreate(option: string) {
    this.router.navigate(["/user/nft-create/qr"]);

    // Display Info in Main Area
    this.$ui.updateNFTView(`Scan ${option}`);
    this.$ui.updateSecondaryRoute('qr');
    this.$ui.openInMainArea(option);
  }
}
