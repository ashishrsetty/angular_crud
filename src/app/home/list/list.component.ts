import { Component, OnInit } from "@angular/core";
import { IStringMap } from "src/app/shared/interfaces/generic.interface";
import { StorageService } from "src/app/shared/services/storage/storage.service";

export interface IEmpDetails {
  name: string;
  age: string;
  dob: string;
}
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  empDetail: IStringMap<string>[] = [];
  storageKey = "EmpDetails";

  constructor(private readonly storageService: StorageService) {}

  ngOnInit(): void {
    this.getStoredEmpDetails();
  }

  getStoredEmpDetails() {
    const storedDetail = this.storageService.getSessionStorage(this.storageKey);
    if (storedDetail) {
      this.empDetail = JSON.parse(storedDetail);
    } else {
      this.empDetail = [];
    }
  }

  deleteDetail(id: string) {
    if (confirm("Are you sure to delete ")) {
      const storedDetail = this.storageService.getSessionStorage(
        this.storageKey
      );
      if (storedDetail && storedDetail.length) {
        const storedList = JSON.parse(storedDetail);
        const foundIndex = storedList.findIndex(
          (e: IStringMap<string>) => e["id"] === id
        );
        if (foundIndex > -1) {
          storedList.splice(foundIndex, 1);
        }
        this.storageService.saveSessionStorage(
          this.storageKey,
          JSON.stringify(storedList)
        );
        this.getStoredEmpDetails();
      }
    }
  }
}
