import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dictionary } from 'src/app/shared/models/dictionary';
import { UIStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'app-nft-verify',
  templateUrl: './nft-verify.component.html',
  styleUrls: ['./nft-verify.component.scss']
})
export class NftVerifyComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  openInMainArea = false;

  terms_from_dic = new Dictionary().terms

  constructor(private $ui: UIStateService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.add(this.$ui.$mainAreaOpener.subscribe((mainAreaId: any) => {
      console.log('trying to open', mainAreaId)
      if (mainAreaId)
        this.displayInMainArea()
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  displayInMainArea() {
    this.openInMainArea = true;
  }

  closeMainArea(e: any) {
    this.openInMainArea = false;
    this.router.navigate(['/user/nft-create/fh']);
  }
}
