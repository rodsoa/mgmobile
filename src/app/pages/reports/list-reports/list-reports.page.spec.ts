import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReportsPage } from './list-reports.page';

describe('ListReportsPage', () => {
  let component: ListReportsPage;
  let fixture: ComponentFixture<ListReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
