import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NodeService } from 'src/app/shared/services/node.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  productHistory = [];
  subscriptions: Subscription = new Subscription();
  @Input() PID = '';
  @Output() busy = new EventEmitter(false);
  @Output() productExist = new EventEmitter(false);
  isOwner = false;
  accountPK = '';

  constructor(
    private $transact: TransactionService,
    private toastr: ToastrService,
    private $ns: NodeService,
    ) {
      this.subscriptions.add(
        this.$ns._accountHashAvailable$.subscribe(v => {
          let pk = this.$ns.currentPK();
          if (pk) this.accountPK = pk;
        }));
     }

  ngOnInit(): void {
      // Depends on PID
      this.getProductHistory();
  }

  getProductHistory() {
    if (this.PID) {
      this.busy.emit(true);
      
      this.subscriptions.add(
        this.$transact.getTransactionsByPID(this.PID).subscribe( res => {
          console.log(res);
          this.busy.emit(false);
          
          if (res)
            if (res['data'] != false) {
              this.productHistory = res['data'];
              this.productExist.emit(true);
            }
        }, (err) => {
          this.busy.emit(false);
          this.toastr.error('Oops! Something went wrong. Try again', 'History couldn\'t load');
          console.log(err)
        })
      )
    } else this.toastr.success("No Product ID Found", "Scan item again");
  }
}
