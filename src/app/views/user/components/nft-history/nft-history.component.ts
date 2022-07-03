import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Dictionary } from 'src/app/shared/models/dictionary';
import { ImageService } from 'src/app/shared/services/image.service';
import { NftService } from 'src/app/shared/services/nft.service';
import { NodeService } from 'src/app/shared/services/node.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { UIStateService } from 'src/app/shared/services/ui-state.service';
import { GeneralService } from 'src/app/shared/widgets/dynamic-form/services/general.service';

@Component({
  selector: 'app-nft-history',
  templateUrl: './nft-history.component.html',
  styleUrls: ['./nft-history.component.scss']
})
export class NftHistoryComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  viewMode: string = 'tab1';
  title: string = 'History';
  uploadedImageUrl: any = '';
  PID: any = '';
  productExist = false;

  terms = new Dictionary().terms;

  busy = false;
  float_style = true;
  accountPK: string | null = null; 


  constructor(
    private $ui: UIStateService,
    private route: ActivatedRoute,
    private $ns: NodeService,
    ) {
    this.subscriptions.add(
      this.route.url.subscribe(u => {
        this.$ui.updateSecondaryRoute(u[0].path);
        this.viewMode = 'tab1';
        this.title = 'Test';
      })
    );
    // this.subscriptions.add(
    //   this.$nft.$qrCode.subscribe(id => {if (id) this.PID = id})
    // );
    this.subscriptions.add(
      this.$ns._accountHashAvailable$.subscribe(v => {
        let pk = this.$ns.currentPK();
        if (pk) this.accountPK = pk;
      })
    );

  }
  
  ngOnInit(): void {
    this.uploadedImageUrl = localStorage.getItem('CID');
    this.PID = localStorage.getItem('PID');
    console.log('PID', this.PID);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  generateAlias(name: any) {
    return name.toLowerCase().split(' ').join('_');
  }
  
  productAlreadyExist($evt: any) {
    if ($evt) this.productExist = true;
    else this.productExist = false;
  }
  
  isBusy($evt: any) {
    if ($evt) this.busy = true;
    else this.busy = false;
  }
}




