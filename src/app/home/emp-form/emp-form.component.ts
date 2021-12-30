import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { IStringMap } from "src/app/shared/interfaces/generic.interface";

export type Context = "add" | "edit";

@Component({
  selector: "app-emp-form",
  templateUrl: "./emp-form.component.html",
  styleUrls: ["./emp-form.component.scss"],
})
export class EmpFormComponent implements OnInit {
  @Input() context!: Context;
  @Input() empDetails?: IStringMap<string>;
  @Output() submit: EventEmitter<IStringMap<string>> = new EventEmitter<
    IStringMap<string>
  >();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  readonly formGroup = this.fb.group({
    name: ["", [Validators.required]],
    age: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    dob: [""],
  });
  readonly storageKey = "EmpDetails";

  get name() {
    return this.formGroup.get("name") as AbstractControl;
  }

  get age() {
    return this.formGroup.get("age") as AbstractControl;
  }

  get dob() {
    return this.formGroup.get("dob") as AbstractControl;
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.empDetails) {
      this.patchValues(this.empDetails);
    }
  }

  submitEmit() {
    if (this.empDetails) {
      this.submit.emit({ ...this.formGroup.value, id: this.empDetails["id"] });
    } else {
      this.submit.emit({ ...this.formGroup.value });
    }
  }

  cancelEmit() {
    this.cancel.emit();
  }

  patchValues(empDetails: IStringMap<string>) {
    this.formGroup.patchValue({
      name: empDetails["name"],
      age: empDetails["age"],
      dob: empDetails["dob"],
    });
  }
}
