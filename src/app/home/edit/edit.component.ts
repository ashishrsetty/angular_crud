import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IStringMap } from "src/app/shared/interfaces/generic.interface";
import { StorageService } from "src/app/shared/services/storage/storage.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  empId!: string;
  storageKey = "EmpDetails";
  currentDetails!: IStringMap<string>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.empId = params["id"];
    });

    this.getStoredDetails();
  }

  cancel() {
    this.routeToDetails();
  }

  routeToDetails() {
    this.router.navigate(["/home/list"]);
  }

  getStoredDetails() {
    const storedDetail = this.storageService.getSessionStorage(this.storageKey);
    if (storedDetail && storedDetail.length) {
      const storedList = JSON.parse(storedDetail);
      this.currentDetails = storedList.find(
        (e: IStringMap<string>) => e["id"] === this.empId
      );
    }
  }

  submit(details: IStringMap<string>) {
    const storedDetail = this.storageService.getSessionStorage(this.storageKey);
    if (storedDetail && storedDetail.length) {
      const storedList = JSON.parse(storedDetail);
      const foundDetail = storedList.find(
        (e: IStringMap<string>) => e["id"] === this.empId
      );
      foundDetail["name"] = details["name"];
      foundDetail["age"] = details["age"];
      foundDetail["dob"] = details["dob"];
      this.storageService.saveSessionStorage(
        this.storageKey,
        JSON.stringify(storedList)
      );
    }
    this.routeToDetails();
  }
}
