import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftTransferComponent } from './nft-transfer.component';

describe('NftTransferComponent', () => {
  let component: NftTransferComponent;
  let fixture: ComponentFixture<NftTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
