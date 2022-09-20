import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/1', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '/dashboard/1', pathMatch: 'full' },
  {
    path: 'dashboard/:page',
    loadChildren: () => import('src/app/components/table/table.module')
      .then(m => m.TableModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('src/app/components/details/details.module')
      .then(m => m.DetailsModule)
  },
  {
    path: '404',
    loadChildren: () => import('src/app/components/page404/page404.module')
      .then(m => m.Page404Module)
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
