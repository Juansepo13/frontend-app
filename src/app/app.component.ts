import { Component } from '@angular/core';
import { TuitService } from './tuit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-app';
  users: any[] = []; // Inicializa la propiedad 'users' como un arreglo vacío

  constructor(private tuitService: TuitService) {} // Inyecta el servicio en el constructor

  ngOnInit(): void {
    console.log('Antes de llamar al servicio');
    this.tuitService.getTuits().subscribe((data) => {
      // Procesa la respuesta para extraer los datos de usuario y el mensaje del tuit
      this.users = data.map((item) => ({ ...item.user, message: item.message }));
      console.log('Datos del servicio:', data); // Agrega un log para verificar los datos.
    });
    console.log('Después de llamar al servicio');
  }
  
  

  // Define los métodos para editar filas.
  onRowEditInit(user: any) {
    // Lógica para iniciar la edición de una fila.
  }

  onRowEditSave(user: any) {
    // Lógica para guardar la edición de una fila.
  }

  onRowEditCancel(user: any, ri: number) {
    // Lógica para cancelar la edición de una fila.
  }
}

