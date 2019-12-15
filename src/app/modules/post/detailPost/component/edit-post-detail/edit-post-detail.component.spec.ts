import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostDetailComponent } from './edit-post-detail.component';

describe('EditPostDetailComponent', () => {
  let component: EditPostDetailComponent;
  let fixture: ComponentFixture<EditPostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
