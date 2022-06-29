import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftNfcReaderComponent } from './nft-nfc-reader.component';

describe('NftNfcReaderComponent', () => {
  let component: NftNfcReaderComponent;
  let fixture: ComponentFixture<NftNfcReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftNfcReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftNfcReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
