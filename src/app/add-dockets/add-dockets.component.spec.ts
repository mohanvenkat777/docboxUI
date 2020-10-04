import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocketsComponent } from './add-dockets.component';

describe('AddDocketsComponent', () => {
  let component: AddDocketsComponent;
  let fixture: ComponentFixture<AddDocketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
