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
import { UserService } from './user.service'; 
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDeleteComponent } from './users/user-delete/user-delete.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDeleteByIdComponent } from './users/user-delete-by-id/user-delete-by-id.component';
import { ImageBrokeDirective } from './image-broke.directive';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent, 
    UserListComponent, 
    UserDetailsComponent, 
    UserEditComponent, 
    UserDeleteComponent, 
    UserCreateComponent, 
    UserDeleteByIdComponent, 
    ImageBrokeDirective,
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
    MatIconModule,
    ButtonModule,
    MatSidenavModule,
    MatDialogModule,
    InputTextModule,  
    AvatarModule,
    AvatarGroupModule,
    CascadeSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatChipsModule,
    MatSelectModule 
  ],
  providers: [PrimeNGConfig, UserService], // Agrega UserService y TuitService como proveedores
  bootstrap: [AppComponent],
})
export class AppModule {}
