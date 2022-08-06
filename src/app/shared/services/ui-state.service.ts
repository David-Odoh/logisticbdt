import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UIStateService {
  nftPageInView: string = '';
  initialStoreWidth = window.innerWidth;

  storeWidth = new BehaviorSubject<any>(this.initialStoreWidth);
  $storeWidth = this.storeWidth.asObservable();

  mainAreaOpener = new BehaviorSubject<any>(null);
  $mainAreaOpener = this.mainAreaOpener.asObservable();

  secRoute = new BehaviorSubject<any>('fh');
  $secRoute = this.secRoute.asObservable();

  productId = '';

  constructor() { }

  updateSecondaryRoute(title: any) {
    this.secRoute.next(title);
  }

  updateStoreWidth(width: any) {
    this.storeWidth.next(width);
  }

  openInMainArea(id: any) {
    this.mainAreaOpener.next(id);
  }

  updateNFTView(title: string) {
    this.nftPageInView = title;
  }

  resetVariables() {
    this.secRoute.next('fh');
    this.nftPageInView = '';
    this.mainAreaOpener.next(null);
  }

}
