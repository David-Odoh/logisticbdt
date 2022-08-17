import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftCameraComponent } from './nft-camera.component';

describe('NftCameraComponent', () => {
  let component: NftCameraComponent;
  let fixture: ComponentFixture<NftCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
