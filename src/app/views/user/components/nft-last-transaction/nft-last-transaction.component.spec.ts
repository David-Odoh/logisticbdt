import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftLastTransactionComponent } from './nft-last-transaction.component';

describe('NftLastTransactionComponent', () => {
  let component: NftLastTransactionComponent;
  let fixture: ComponentFixture<NftLastTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftLastTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftLastTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
