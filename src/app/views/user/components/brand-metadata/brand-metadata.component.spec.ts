import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMetadataComponent } from './brand-metadata.component';

describe('BrandMetadataComponent', () => {
  let component: BrandMetadataComponent;
  let fixture: ComponentFixture<BrandMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandMetadataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
