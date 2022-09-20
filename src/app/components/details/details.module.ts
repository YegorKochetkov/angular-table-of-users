import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { DetailsComponent } from 'src/app/components/details/details.component';
import { DetailsRoutingModule } from 'src/app/components/details/details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    DetailsRoutingModule
  ],
  declarations: [DetailsComponent]
})
export class DetailsModule {}
