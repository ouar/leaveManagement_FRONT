import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCollaborateurComponent } from './liste-collaborateur.component';

describe('ListeCollaborateurComponent', () => {
  let component: ListeCollaborateurComponent;
  let fixture: ComponentFixture<ListeCollaborateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeCollaborateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
