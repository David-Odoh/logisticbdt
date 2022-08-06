import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { Subscription } from 'rxjs';
import { NftService } from 'src/app/shared/services/nft.service';
import { UIStateService } from 'src/app/shared/services/ui-state.service';


@Component({
  selector: 'nft-qr-scanner',
  templateUrl: './nft-qr-scanner.component.html',
  styleUrls: ['./nft-qr-scanner.component.scss']
})
export class NftQrScannerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  allowedFormats = [ 
    BarcodeFormat.QR_CODE, 
    BarcodeFormat.EAN_13, 
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_128, 
    BarcodeFormat.CODE_93,
    BarcodeFormat.CODE_39,
    BarcodeFormat.ITF,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.PDF_417,
    BarcodeFormat.AZTEC,
    BarcodeFormat.CODABAR,
   ];

   qrResultString: any = null;
   currentUrl: string = '';
   //@ts-ignore
   @ViewChild("scanner", { static: true }) scanner: ElementRef;

  constructor(private router: Router, private $nft: NftService, private $ui: UIStateService) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    this.subscriptions.add(
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) this.currentUrl = this.router.url;
    }));
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.scanner.scanStop();

    this.subscriptions.unsubscribe();
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  scannedResult(resultString: string) {
    console.log(resultString);
    this.qrResultString = resultString;
  }

  camerasFound(event: any) {
    if ('deviceId' in event[0]) {
      //@ts-ignore
      this.scanner.scan(event[0].deviceId);     
    }
}

  processWithMintFlow() {
    if (this.qrResultString) {
      this.$nft.updateQrCode(this.qrResultString);

      // Update new screen title
      this.$ui.updateNFTView('Enter Metadata');
      this.$ui.updateSecondaryRoute('metadata');
      this.$ui.openInMainArea('metadata');

      if (this.currentUrl.includes('verify'))
        this.router.navigate(['/user/nft-verify/history']);
      else
        this.router.navigate(['/user/nft-create/metadata']);
    }
  }
}
