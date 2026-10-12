import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';
import { FiltroCategoria } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

/** Opción del filtro por categoría. */
interface OpcionFiltro {
  valor: FiltroCategoria;
  texto: string;
}

/** Catálogo de noticias con filtro por categoría, buscador y botón para eliminar. */
@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [FormsModule, NoticiaCardComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {
  readonly servicio = inject(NoticiasService);

  readonly filtros: OpcionFiltro[] = [
    { valor: 'todas', texto: 'Todas' },
    { valor: 'educativas', texto: 'Educación' },
    { valor: 'tecnologicas', texto: 'Tecnología' },
    { valor: 'turisticas', texto: 'Turismo' },
    { valor: 'comerciales', texto: 'Comercio' }
  ];

  /** Estado de la pantalla (signals): categoría elegida y texto buscado. */
  readonly filtroActivo = signal<FiltroCategoria>('todas');
  readonly busqueda = signal('');

  /** Lista que se muestra: se recalcula sola cuando cambia el filtro, la búsqueda o el catálogo. */
  readonly filtradas = computed(() => {
    const categoria = this.filtroActivo();
    const texto = this.normalizar(this.busqueda());
    return this.servicio.noticias().filter((n) => {
      const coincideCategoria = categoria === 'todas' || n.categoria === categoria;
      const coincideTexto =
        texto === '' || this.normalizar(`${n.titulo} ${n.descripcionBreve}`).includes(texto);
      return coincideCategoria && coincideTexto;
    });
  });

  /** CRUD - Eliminar: pide confirmación y delega en el servicio. */
  eliminar(id: number): void {
    if (confirm('¿Eliminar esta noticia?')) {
      this.servicio.eliminar(id);
    }
  }

  /** Pasa a minúsculas y quita tildes para que "tecnologia" encuentre "Tecnología". */
  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
