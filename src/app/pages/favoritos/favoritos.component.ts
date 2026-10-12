import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';

/** Lista personalizada con las noticias que el usuario marcó como favoritas. */
@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, NoticiaCardComponent],
  templateUrl: './favoritos.component.html'
})
export class FavoritosComponent {
  readonly servicio = inject(NoticiasService);
  private readonly favoritos = inject(FavoritosService);

  /** Cruza el catálogo con los ids guardados como favoritos. */
  readonly favoritas = computed(() =>
    this.servicio.noticias().filter((n) => this.favoritos.lista().includes(n.id))
  );
}
