import { Signal } from "@angular/core";
import { Animal } from "../models/animal.model";

export abstract class AbstractAnimalService {
  abstract animals: Signal<Animal[]>;
}