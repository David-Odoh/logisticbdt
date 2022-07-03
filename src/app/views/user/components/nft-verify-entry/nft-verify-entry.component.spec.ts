import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftVerifyEntryComponent } from './nft-verify-entry.component';

describe('NftVerifyEntryComponent', () => {
  let component: NftVerifyEntryComponent;
  let fixture: ComponentFixture<NftVerifyEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftVerifyEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftVerifyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
