import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { CreateComponent } from "./create/create.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ListComponent } from "./list/list.component";
import { EditComponent } from './edit/edit.component';
import { EmpFormComponent } from './emp-form/emp-form.component';

@NgModule({
  declarations: [CreateComponent, ListComponent, EditComponent, EmpFormComponent],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule],
})
export class HomeModule {}
