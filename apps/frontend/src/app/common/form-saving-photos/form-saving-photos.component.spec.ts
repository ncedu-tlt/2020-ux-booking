import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSavingPhotosComponent } from './form-saving-photos.component';

describe('FormSavingPhotosComponent', () => {
  let component: FormSavingPhotosComponent;
  let fixture: ComponentFixture<FormSavingPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSavingPhotosComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSavingPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
