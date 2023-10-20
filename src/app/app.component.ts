import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router'; // Agrega la importación de Router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend-app';
  searchText= "";
  users: any[] = [];
  plusIcon = PrimeIcons.PLUS;
  imagen: any = '/home/juansepo13/Alltic/frontend-app/src/alltic-logo.png';
entrante: any;
  

  constructor(
    private userService: UserService, 
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loadTuits();
  }

  loadTuits() {
    console.log('Antes de llamar al servicio');
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data.map((item: any) => ({ ...item.user, message: item.message }));
      console.log('Datos del servicio:', data);
      console.log('Después de llamar al servicio');
    });
  }

  // Función para navegar a la lista de usuarios
  navigateToUsersList() {
    this.router.navigate(['/users-list']);
  }
}
