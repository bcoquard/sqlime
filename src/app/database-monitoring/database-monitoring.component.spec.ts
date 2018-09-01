import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseMonitoringComponent } from './database-monitoring.component';

describe('DatabaseMonitoringComponent', () => {
  let component: DatabaseMonitoringComponent;
  let fixture: ComponentFixture<DatabaseMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
