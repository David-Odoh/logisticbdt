import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftScanOptionsComponent } from './nft-scan-options.component';

describe('NftScanOptionsComponent', () => {
  let component: NftScanOptionsComponent;
  let fixture: ComponentFixture<NftScanOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftScanOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftScanOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
