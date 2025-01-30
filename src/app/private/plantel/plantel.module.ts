import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Add this import
import { PlantelComponent } from './plantel.component';

@NgModule({
  declarations: [PlantelComponent],
  imports: [
    CommonModule,
    FormsModule,  // <-- Add this to the imports array
  ],
  exports: [PlantelComponent],
})
export class PlantelModule {}
