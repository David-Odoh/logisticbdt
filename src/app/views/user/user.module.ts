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
import { BrandRegisterComponent } from './brand-pages/brand-register/brand-register.component';
import { BrandMetadataComponent } from './components/brand-metadata/brand-metadata.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { NftNfcReaderComponent } from './components/nft-nfc-reader/nft-nfc-reader.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { NftVerifyEntryComponent } from './components/nft-verify-entry/nft-verify-entry.component';
import { NftHistoryComponent } from './components/nft-history/nft-history.component';
import { BrandVerifyComponent } from './brand-pages/brand-verify/brand-verify.component';
import { BrandIndentityVerificationComponent } from './components/brand-indentity-verification/brand-indentity-verification.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    BrandRegisterComponent,
    BrandMetadataComponent,
    ComingSoonComponent,
    NftNfcReaderComponent,
    SearchResultComponent,
    NftVerifyEntryComponent,
    NftHistoryComponent,
    BrandVerifyComponent,
    BrandIndentityVerificationComponent,
    AccountFormComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ZXingScannerModule,
    DynamicFormModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
