import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalUserCard } from './animal-user-card.component';

describe('AnimalUserCard', () => {
  let component: AnimalUserCard;
  let fixture: ComponentFixture<AnimalUserCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalUserCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalUserCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
