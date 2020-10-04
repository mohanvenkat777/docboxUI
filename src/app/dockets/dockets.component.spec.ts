import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocketsComponent } from './dockets.component';

describe('DocketsComponent', () => {
  let component: DocketsComponent;
  let fixture: ComponentFixture<DocketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
