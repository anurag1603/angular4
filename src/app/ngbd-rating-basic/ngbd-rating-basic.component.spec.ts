import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdRatingBasicComponent } from './ngbd-rating-basic.component';

describe('NgbdRatingBasicComponent', () => {
  let component: NgbdRatingBasicComponent;
  let fixture: ComponentFixture<NgbdRatingBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdRatingBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdRatingBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
