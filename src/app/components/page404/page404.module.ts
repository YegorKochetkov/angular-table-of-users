import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Page404RoutingModule } from 'src/app/components/page404/page404-routing.module';
import { Page404Component } from 'src/app/components/page404/page404.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    Page404RoutingModule
  ],
  declarations: [Page404Component]
})
export class Page404Module {}
