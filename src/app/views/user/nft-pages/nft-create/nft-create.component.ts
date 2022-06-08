import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dictionary } from 'src/app/shared/models/dictionary';
import { UIStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'app-nft-create',
  templateUrl: './nft-create.component.html',
  styleUrls: ['./nft-create.component.scss']
})
export class NftCreateComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  openInMainArea = false;

  terms_from_dic = new Dictionary().terms

  constructor(private $ui: UIStateService) { }

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
    this.openInMainArea = false
  }
}
