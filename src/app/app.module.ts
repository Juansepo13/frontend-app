import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from './user.service'; // Importa el servicio UserService
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserCreateComponent } from './user-create/user-create.component';


@NgModule({
  declarations: [
    AppComponent, 
    UserListComponent, 
    UserDetailsComponent, 
    UserEditComponent, 
    UserDeleteComponent, 
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    TableModule,
    ToastModule,
    DropdownModule,
    RouterModule,
  ],
  providers: [PrimeNGConfig, UserService], // Agrega UserService y TuitService como proveedores
  bootstrap: [AppComponent],
})
export class AppModule {}
