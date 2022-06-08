import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftCreateEntryComponent } from './nft-create-entry.component';

describe('NftCreateEntryComponent', () => {
  let component: NftCreateEntryComponent;
  let fixture: ComponentFixture<NftCreateEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftCreateEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftCreateEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
