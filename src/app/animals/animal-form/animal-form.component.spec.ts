import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalForm } from './animal-form.component';

describe('AnimalForm', () => {
  let component: AnimalForm;
  let fixture: ComponentFixture<AnimalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
