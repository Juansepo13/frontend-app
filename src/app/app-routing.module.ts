import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuitCrudComponent } from './tuit-crud/tuit-crud.component';

const routes: Routes = [
  { path: 'tuits', component: TuitCrudComponent }, // Ruta existente
  // Otras rutas de tu aplicación
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
