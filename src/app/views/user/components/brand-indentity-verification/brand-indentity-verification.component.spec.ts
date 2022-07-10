import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandIndentityVerificationComponent } from './brand-indentity-verification.component';

describe('BrandIndentityVerificationComponent', () => {
  let component: BrandIndentityVerificationComponent;
  let fixture: ComponentFixture<BrandIndentityVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandIndentityVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandIndentityVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
