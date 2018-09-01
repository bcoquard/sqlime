import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCompareComponent } from './database-compare.component';

describe('DatabaseCompareComponent', () => {
  let component: DatabaseCompareComponent;
  let fixture: ComponentFixture<DatabaseCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
