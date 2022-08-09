import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginedUserprofileComponent } from './logined-userprofile.component';

describe('LoginedUserprofileComponent', () => {
  let component: LoginedUserprofileComponent;
  let fixture: ComponentFixture<LoginedUserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginedUserprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginedUserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
