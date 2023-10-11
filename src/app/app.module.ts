import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule aquí

import { AppComponent } from './app.component';
import { TuitCrudComponent } from './tuit-crud/tuit-crud.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [AppComponent, TuitCrudComponent, RegistroComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Asegúrate de que FormsModule esté importado aquí
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
