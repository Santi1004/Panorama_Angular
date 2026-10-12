import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';
import { NoticiasService } from '../../services/noticias.service';

/** Página de inicio: bienvenida, noticias destacadas y llamados a la acción. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NoticiaCardComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly servicio = inject(NoticiasService);

  /** Las tres primeras noticias del catálogo se muestran como destacadas. */
  readonly destacadas = computed(() => this.servicio.noticias().slice(0, 3));
}
