import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftFlowHolderComponent } from './nft-flow-holder.component';

describe('NftFlowHolderComponent', () => {
  let component: NftFlowHolderComponent;
  let fixture: ComponentFixture<NftFlowHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftFlowHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftFlowHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
