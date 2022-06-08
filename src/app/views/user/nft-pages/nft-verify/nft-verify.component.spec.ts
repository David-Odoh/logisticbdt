import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftVerifyComponent } from './nft-verify.component';

describe('NftVerifyComponent', () => {
  let component: NftVerifyComponent;
  let fixture: ComponentFixture<NftVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
