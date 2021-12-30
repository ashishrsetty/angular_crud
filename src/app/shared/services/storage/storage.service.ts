import { Injectable } from "@angular/core";
import { IStringMap } from "../../interfaces/generic.interface";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  saveSessionStorage(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key);
  }
}
