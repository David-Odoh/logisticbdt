import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NftCreateComponent } from './nft-pages/nft-create/nft-create.component';
import { NftListComponent } from './nft-pages/nft-list/nft-list.component';
import { NftVerifyComponent } from './nft-pages/nft-verify/nft-verify.component';
import { NftScanOptionsComponent } from './components/nft-scan-options/nft-scan-options.component';
import { NftQrScannerComponent } from './components/nft-qr-scanner/nft-qr-scanner.component';
import { NftCreateEntryComponent } from './components/nft-create-entry/nft-create-entry.component';
import { NftFlowHolderComponent } from './components/nft-flow-holder/nft-flow-holder.component';
import { NftMetadataComponent } from './components/nft-metadata/nft-metadata.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { DynamicFormModule } from 'src/app/shared/widgets/dynamic-form/dynamic-form.module';
import { StoreFrontComponent } from './market-pages/store-front/store-front.component';
import { SearchHomeComponent } from './search-pages/search-home/search-home.component';
import { AccountSettingsComponent } from './account-pages/account-settings/account-settings.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    NftCreateComponent,
    NftListComponent,
    NftVerifyComponent,
    NftScanOptionsComponent,
    NftQrScannerComponent,
    NftCreateEntryComponent,
    NftFlowHolderComponent,
    NftMetadataComponent,
    StoreFrontComponent,
    SearchHomeComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ZXingScannerModule,
    DynamicFormModule,
  ]
})
export class UserModule { }
