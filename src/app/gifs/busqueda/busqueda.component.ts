import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  // Busca un elemento en el archivo html, con el nombre txtBuscar
  // ! indica que el objeto no es nulo y evitar errores de typescript (Non-null assertion operator)
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  // Inyecta el servicio para poder acceder a sus propiedades
  constructor(private gifsSerice: GifsService) {}

  // Función para capturar el valor de la caja de texto
  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0){
      return;
    }

    this.gifsSerice.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }
}
