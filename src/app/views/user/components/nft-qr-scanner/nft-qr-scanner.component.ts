import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { NftService } from 'src/app/shared/services/nft.service';
import { UIStateService } from 'src/app/shared/services/ui-state.service';


@Component({
  selector: 'nft-qr-scanner',
  templateUrl: './nft-qr-scanner.component.html',
  styleUrls: ['./nft-qr-scanner.component.scss']
})
export class NftQrScannerComponent implements OnInit {
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
   //@ts-ignore
   @ViewChild("scanner", { static: true }) scanner: ElementRef;

  constructor(private router: Router, private $nft: NftService, private $ui: UIStateService) { }

  ngOnInit(): void {
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

      this.router.navigate(['/user/nft-create/metadata']);
    }
  }
}
