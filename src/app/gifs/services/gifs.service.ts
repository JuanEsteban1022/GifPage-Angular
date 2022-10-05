import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

// providedIn: 'root', permite que sea de acceso global
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];

  private api_key: string = 'mkWMpo7ivUtrys7wxljtvGAJCtomYBtx';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';

  // Tipo Gif, declarado en la interface
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    // Metodo 1: Información persistente
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // // Metodo 1: Información persistente
    // if (localStorage.getItem('historial')) {
    //   // Toma un objeto que ha sido serializado y lo conviente nuevamente en un objeto
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    // Valida si ya existe el valor, sino existe lo incluye
    if (!this._historial.includes(query)) {
      // Inserta el valor de query en el primer lugar del arreglo
      this._historial.unshift(query);

      // Limitar el tamaño del historial, splice remueve elementos e inserta nuevos elementos
      this._historial = this._historial.splice(0, 10);
      // JSON.stringify, toma cualquier objeto y lo transforma en string (Serializar)
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', query);

    // EL subscribe se ejecuta cuando se tiene la resolucion del get
    this.http
      .get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        // Serializar el objeto resultados, para ser almacenado en el navegador
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
