import { Provider } from "@angular/core";
import { AbstractAnimalService } from "./abstract-animal.service";
import { environment } from '../../../../environments/environments'
import { MockAnimalService } from "./mock-animal.service";
import { AnimalService } from "./animal.service";


export const animalServiceProvider: Provider = {
    provide: AbstractAnimalService,
    useClass: environment.useMockService ? MockAnimalService : AnimalService
}