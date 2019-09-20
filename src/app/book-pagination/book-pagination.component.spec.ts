import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPaginationComponent } from './book-pagination.component';

describe('BookPaginationComponent', () => {
  let component: BookPaginationComponent;
  let fixture: ComponentFixture<BookPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
