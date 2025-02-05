import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoceteRoutingModule } from './docete-routing.module';
import { DocenteComponent } from './docente.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DocenteComponent
  ],
  imports: [
    CommonModule,
    DoceteRoutingModule
  ]
})
export class DoceteModule { }
