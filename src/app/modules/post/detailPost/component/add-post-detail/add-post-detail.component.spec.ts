import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostDetailComponent } from './add-post-detail.component';

describe('AddPostDetailComponent', () => {
  let component: AddPostDetailComponent;
  let fixture: ComponentFixture<AddPostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
