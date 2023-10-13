import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users-list', component: UserListComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-edit/edit/:id', component: UserEditComponent },
  { path: 'user-delete/delete/:id', component: UserDeleteComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
