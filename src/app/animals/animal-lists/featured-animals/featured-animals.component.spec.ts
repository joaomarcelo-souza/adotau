import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAnimals } from './featured-animals.component';

describe('FeaturedAnimals', () => {
  let component: FeaturedAnimals;
  let fixture: ComponentFixture<FeaturedAnimals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedAnimals],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedAnimals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
