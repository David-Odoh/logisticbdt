import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandVerifyComponent } from './brand-verify.component';

describe('BrandVerifyComponent', () => {
  let component: BrandVerifyComponent;
  let fixture: ComponentFixture<BrandVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
