import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from 'src/app/components/table/table.component';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard/1', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard/1', pathMatch: 'full' },
  { path: 'dashboard/:page', component: TableComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
