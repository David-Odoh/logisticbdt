import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-pages/account-settings/account-settings.component';
import { BrandRegisterComponent } from './brand-pages/brand-register/brand-register.component';
import { NftFlowHolderComponent } from './components/nft-flow-holder/nft-flow-holder.component';
import { NftHistoryComponent } from './components/nft-history/nft-history.component';
import { NftMetadataComponent } from './components/nft-metadata/nft-metadata.component';
import { NftNfcReaderComponent } from './components/nft-nfc-reader/nft-nfc-reader.component';
import { NftQrScannerComponent } from './components/nft-qr-scanner/nft-qr-scanner.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { StoreFrontComponent } from './market-pages/store-front/store-front.component';
import { NftCreateComponent } from './nft-pages/nft-create/nft-create.component';
import { NftVerifyComponent } from './nft-pages/nft-verify/nft-verify.component';
import { SearchHomeComponent } from './search-pages/search-home/search-home.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'home',
    pathMatch: "full",
  },
  {
      path: "nft-create",
      component: NftCreateComponent,
      children: [
        { path: '', redirectTo: 'fh', pathMatch: "full" },
      { path: 'fh', component: NftFlowHolderComponent },
      { path: 'metadata', component: NftMetadataComponent },
      { path: 'qr', component: NftQrScannerComponent },
      { path: 'nfc', component: NftNfcReaderComponent },
      { path: '**', redirectTo: 'fh', pathMatch: "full" },
      ]
    }, 
  {
      path: "nft-verify",
      component: NftVerifyComponent,
      children: [
        { path: '', redirectTo: 'fh', pathMatch: "full" },
      { path: 'fh', component: NftFlowHolderComponent },
      { path: 'history', component: NftHistoryComponent },
      { path: 'qr', component: NftQrScannerComponent },
      { path: 'nfc', component: NftNfcReaderComponent },
      { path: '**', redirectTo: 'fh', pathMatch: "full" },
      ]
    }, 
  {
      path: "register-brand",
      component: BrandRegisterComponent,
      // children: [
      //   { path: '', redirectTo: 'fh', pathMatch: "full" },
      //   { path: 'fh', component: NftFlowHolderComponent },
      //   { path: '**', redirectTo: 'fh', pathMatch: "full" },
      // ]
    }, 
    { path: 'home', component: DashboardPageComponent}, 
    { path: 'market', component: StoreFrontComponent}, 
    { path: 'search', component: SearchHomeComponent}, 
    { path: 'account', component: AccountSettingsComponent}, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
