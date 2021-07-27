import { TestBed } from '@angular/core/testing';
import { LayoutPublicComponent } from './layout-public.component';

describe('LayoutPublicComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutPublicComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LayoutPublicComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
