import { Signal } from "@angular/core";
import { Animal } from "../models/animal.model";
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result.model";

export abstract class AbstractAnimalService {
    abstract animals: Signal<Animal[]>;
    abstract getAnimalById(id: number): Signal<Animal | undefined>;
    abstract add(animal: Omit<Animal, 'id'>): Observable<OperationResult<Animal>>;
    abstract update(animal: Animal): Observable<OperationResult>;
    abstract remove(id: number): Observable<OperationResult>;
}