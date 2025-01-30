import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Important: Add this
import { PlantelComponent } from '../app/private/plantel/plantel.component'; // <-- Important: Add this

@NgModule({
  declarations: [PlantelComponent],
  imports: [
    CommonModule,
    FormsModule, // <-- Include FormsModule in imports
  ],
  exports: [PlantelComponent],
})
export class PlantelModule {}
