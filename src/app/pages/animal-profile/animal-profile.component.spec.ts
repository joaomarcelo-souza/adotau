import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalProfile } from './animal-profile.component';

describe('AnimalProfile', () => {
  let component: AnimalProfile;
  let fixture: ComponentFixture<AnimalProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
