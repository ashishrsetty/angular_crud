import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IStringMap } from "src/app/shared/interfaces/generic.interface";
import { StorageService } from "src/app/shared/services/storage/storage.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  storageKey = "EmpDetails";
  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  submit(value: IStringMap<string>) {
    const storedDetails = this.storageService.getSessionStorage(
      this.storageKey
    );
    const valueWithId = { ...value, id: this.getUniqueNumber() };
    if (storedDetails) {
      const existingDetails = JSON.parse(storedDetails);
      existingDetails.push(valueWithId);
      this.storageService.saveSessionStorage(
        this.storageKey,
        JSON.stringify(existingDetails)
      );
    } else {
      this.storageService.saveSessionStorage(
        this.storageKey,
        JSON.stringify([valueWithId])
      );
    }
    this.routeToList();
  }

  routeToList() {
    this.router.navigate(["/home/list"]);
  }

  cancel() {
    this.routeToList();
  }

  getUniqueNumber() {
    return Math.random().toString(16).slice(2);
  }
}
