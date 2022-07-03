import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftHistoryComponent } from './nft-history.component';

describe('NftHistoryComponent', () => {
  let component: NftHistoryComponent;
  let fixture: ComponentFixture<NftHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
