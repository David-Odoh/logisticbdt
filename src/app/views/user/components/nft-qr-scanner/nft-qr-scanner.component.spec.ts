import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftQrScannerComponent } from './nft-qr-scanner.component';

describe('NftQrScannerComponent', () => {
  let component: NftQrScannerComponent;
  let fixture: ComponentFixture<NftQrScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftQrScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftQrScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
