import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule aquí
import { PrimeNGConfig } from 'primeng/api'; // Importa PrimeNGConfig

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    TableModule,
    ToastModule,
    DropdownModule
  ],
  providers: [PrimeNGConfig], // Agrega PrimeNGConfig como proveedor
  bootstrap: [AppComponent],
})
export class AppModule {}
