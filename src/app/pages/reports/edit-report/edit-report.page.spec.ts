import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportPage } from './edit-report.page';

describe('EditReportPage', () => {
  let component: EditReportPage;
  let fixture: ComponentFixture<EditReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
