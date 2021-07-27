import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [
        DashboardComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
