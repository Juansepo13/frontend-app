import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend-app';
  users: any[] = [];
  plusIcon = PrimeIcons.PLUS;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadTuits();
  }

  loadTuits() {
    console.log('Antes de llamar al servicio');
    this.userService.getUsers().subscribe((data: any[]) => { // Especifica el tipo de 'data'
      // Procesa la respuesta para extraer los datos de usuario y el mensaje del tuit
      this.users = data.map((item: any) => ({ ...item.user, message: item.message })); // Especifica el tipo de 'item'
      console.log('Datos del servicio:', data); // Agrega un log para verificar los datos.
      console.log('Después de llamar al servicio');
    });
  }

  // Resto de tu código
}
