import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/** Un enlace del menú de navegación. */
interface EnlaceMenu {
  ruta: string;
  texto: string;
}

/** Encabezado del sitio: logotipo, fecha del día y menú de navegación. */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly hoy = new Date();
  readonly formatoFecha = "EEEE, d 'de' MMMM 'de' y";

  readonly enlaces: EnlaceMenu[] = [
    { ruta: '/', texto: 'Inicio' },
    { ruta: '/noticias', texto: 'Noticias' },
    { ruta: '/favoritos', texto: 'Favoritos' },
    { ruta: '/contacto', texto: 'Contacto' },
    { ruta: '/publicar', texto: 'Publicar' }
  ];
}
