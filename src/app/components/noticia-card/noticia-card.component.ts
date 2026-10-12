import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, Noticia } from '../../models/noticia.model';

/**
 * Tarjeta reutilizable que muestra el resumen de una noticia.
 * Se usa en Inicio, Noticias y Favoritos.
 *
 *  - @Input  noticia: recibe los datos desde el componente padre (property binding).
 *  - @Input  permitirEliminar: muestra u oculta el botón "Eliminar".
 *  - @Output eliminar: avisa al padre que el usuario pidió eliminar (event binding).
 */
@Component({
  selector: 'app-noticia-card',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './noticia-card.component.html'
})
export class NoticiaCardComponent {
  @Input({ required: true }) noticia!: Noticia;
  @Input() permitirEliminar = false;
  @Output() eliminar = new EventEmitter<number>();

  readonly formatoFecha = "d 'de' MMM 'de' y";

  get nombreCategoria(): string {
    return CATEGORIAS[this.noticia.categoria] ?? this.noticia.categoria;
  }
}
