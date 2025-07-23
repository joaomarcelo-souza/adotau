import { Signal } from "@angular/core";
import { User } from "../models/user.model";

export abstract class AbstractUserService {
  abstract user: Signal<User[]>;
  abstract getUserById(id: number): Signal<User | undefined>;
}