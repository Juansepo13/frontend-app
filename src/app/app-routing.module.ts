import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDeleteComponent } from './users/user-delete/user-delete.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'users', component: UserListComponent }, 
  { path: 'users-list', component: UserListComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'user-delete/delete/:id', component: UserDeleteComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
