import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NftService } from 'src/app/shared/services/nft.service';
import { NodeService } from 'src/app/shared/services/node.service';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html',
  styleUrls: ['./nft-list.component.scss']
})
export class NftListComponent implements OnInit {
  accountName = 'My Luxury NFTs';
  myNFTs = [];
  subscriptions: Subscription = new Subscription();
  isOwner = false;
  busy = false;
  accountPK = '';

  constructor(
    private $nft: NftService,
    private toastr: ToastrService,
    private $ns: NodeService,
    private loc: Location
    ) { 
      this.subscriptions.add(
        this.$ns._accountHashAvailable$.subscribe(v => {
          let pk = this.$ns.currentPK();
          if (pk) {
            this.accountPK = pk;
            this.getMyNFTs();
          }
        }));
    }

  ngOnInit(): void {
  }

  getMyNFTs() {
    if (this.accountPK) {
      this.busy = true;
      
      this.subscriptions.add(
        this.$nft.myNFTs(this.accountPK).subscribe( res => {
          console.log(res);
          this.busy = false;
          
          if (res)
            if (res['data'] != false) {
              this.myNFTs = res['data'];
            }
        }, (err) => {
          this.busy = false;
          this.toastr.error('Oops! Something went wrong. Try again', 'History couldn\'t load');
          console.log(err)
        })
      )
    } else this.toastr.success("No Product ID Found", "Scan item again");
  }

  goBack() {
    this.loc.back();
  }
}
