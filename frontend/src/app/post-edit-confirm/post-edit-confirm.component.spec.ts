import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditConfirmComponent } from './post-edit-confirm.component';

describe('PostEditConfirmComponent', () => {
  let component: PostEditConfirmComponent;
  let fixture: ComponentFixture<PostEditConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostEditConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostEditConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
