import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseVisualisationComponent } from './database-visualisation.component';

describe('DatabaseVisualisationComponent', () => {
  let component: DatabaseVisualisationComponent;
  let fixture: ComponentFixture<DatabaseVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
