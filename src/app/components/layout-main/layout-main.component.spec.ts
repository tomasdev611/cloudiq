import { TestBed } from '@angular/core/testing';
import { LayoutMainComponent } from './layout-main.component';

describe('LayoutMainComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutMainComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LayoutMainComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
