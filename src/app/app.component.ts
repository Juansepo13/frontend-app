import { Component } from '@angular/core';
import { TuitService } from './tuit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-app';

  constructor(private tuitService: TuitService) {} // Inyecta el servicio en el constructor

  ngOnInit(): void {
    // Aquí puedes llamar a los métodos del servicio, por ejemplo:
    this.tuitService.getTuits().subscribe((data) => {
      // Maneja los datos aquí, por ejemplo, asignándolos a una propiedad del componente.
    });
  }
}

