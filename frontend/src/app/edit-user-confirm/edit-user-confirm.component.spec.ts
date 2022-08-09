import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserConfirmComponent } from './edit-user-confirm.component';

describe('EditUserConfirmComponent', () => {
  let component: EditUserConfirmComponent;
  let fixture: ComponentFixture<EditUserConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
