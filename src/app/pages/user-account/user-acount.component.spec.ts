import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcountComponent } from './user-acount.component';

describe('UserAcountComponent', () => {
  let component: UserAcountComponent;
  let fixture: ComponentFixture<UserAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAcountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
