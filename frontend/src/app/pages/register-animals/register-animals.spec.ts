import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAnimals } from './register-animals';

describe('RegisterAnimals', () => {
  let component: RegisterAnimals;
  let fixture: ComponentFixture<RegisterAnimals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAnimals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAnimals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
