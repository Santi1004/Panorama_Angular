import { Injectable, computed, signal } from '@angular/core';
import { guardarLS, leerLS } from '../utils/storage';

const LS_FAVORITOS = 'panorama_favoritos';

/**
 * Servicio de favoritos: guarda los ids de las noticias marcadas por el usuario.
 * Persiste en localStorage, por lo que se conservan al cerrar o recargar el navegador.
 */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly ids = signal<number[]>(leerLS<number>(LS_FAVORITOS));

  /** Lista de ids favoritos (solo lectura). */
  readonly lista = this.ids.asReadonly();

  /** Cantidad de favoritos. */
  readonly total = computed(() => this.ids().length);

  esFavorito(id: number): boolean {
    return this.ids().includes(id);
  }

  /** Agrega la noticia a favoritos si no está; la quita si ya estaba. */
  alternar(id: number): void {
    this.ids.update((lista) =>
      lista.includes(id) ? lista.filter((f) => f !== id) : [...lista, id]
    );
    guardarLS(LS_FAVORITOS, this.ids());
  }
}
