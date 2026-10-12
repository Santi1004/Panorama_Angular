import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CATEGORIAS, Noticia } from '../../models/noticia.model';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';

/** Vista de detalle: información completa de una noticia y botón de favoritos. */
@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './detalle.component.html'
})
export class DetalleComponent {
  private readonly ruta = inject(ActivatedRoute);
  readonly servicio = inject(NoticiasService);
  readonly favoritos = inject(FavoritosService);

  readonly formatoFecha = "d 'de' MMMM 'de' y";

  /** Parámetros de la URL (/noticia/:id), como signal. */
  private readonly parametros = toSignal(this.ruta.paramMap, {
    initialValue: this.ruta.snapshot.paramMap
  });

  /** Noticia que corresponde al id de la URL (undefined si no existe). */
  readonly noticia = computed(() => this.servicio.porId(Number(this.parametros().get('id'))));

  nombreCategoria(n: Noticia): string {
    return CATEGORIAS[n.categoria] ?? n.categoria;
  }
}
