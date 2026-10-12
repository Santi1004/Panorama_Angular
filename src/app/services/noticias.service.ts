import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Noticia, NuevaNoticia } from '../models/noticia.model';
import { guardarLS, leerLS } from '../utils/storage';

const LS_EXTRA = 'panorama_noticias_extra';
const LS_ELIMINADAS = 'panorama_noticias_eliminadas';
const IMAGEN_POR_DEFECTO =
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80';

/**
 * Servicio de noticias: única fuente de datos de la aplicación.
 *
 * El catálogo final = noticias base (data/noticias.json)
 *                   + noticias creadas por el usuario (localStorage)
 *                   - noticias eliminadas por el usuario (localStorage).
 *
 * Usa "signals": cuando cambian, los componentes que las leen se actualizan solos.
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private readonly http = inject(HttpClient);

  private readonly base = signal<Noticia[]>([]);
  private readonly extra = signal<Noticia[]>(leerLS<Noticia>(LS_EXTRA));
  private readonly eliminadas = signal<number[]>(leerLS<number>(LS_ELIMINADAS));

  /** true mientras se espera la respuesta del JSON. */
  readonly cargando = signal(true);
  /** true si el JSON no pudo cargarse. */
  readonly error = signal(false);

  /** Catálogo completo y actualizado (se recalcula automáticamente). */
  readonly noticias = computed(() =>
    [...this.base(), ...this.extra()].filter((n) => !this.eliminadas().includes(n.id))
  );

  constructor() {
    this.cargarDesdeJson();
  }

  /** Lee data/noticias.json (ruta relativa, sirve también en GitHub Pages). */
  private cargarDesdeJson(): void {
    this.http.get<Noticia[]>('data/noticias.json').subscribe({
      next: (datos) => {
        this.base.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      }
    });
  }

  /** Busca una noticia por id; devuelve undefined si no existe o fue eliminada. */
  porId(id: number): Noticia | undefined {
    return this.noticias().find((n) => n.id === id);
  }

  /** CRUD - Crear: agrega una noticia nueva y la guarda en localStorage. */
  crear(datos: NuevaNoticia): Noticia {
    const noticia: Noticia = {
      id: Date.now(), // identificador único simple
      ...datos,
      imagen: datos.imagen || IMAGEN_POR_DEFECTO,
      // "sv-SE" devuelve la fecha local en formato AAAA-MM-DD
      fecha: new Date().toLocaleDateString('sv-SE')
    };
    this.extra.update((lista) => [...lista, noticia]);
    guardarLS(LS_EXTRA, this.extra());
    return noticia;
  }

  /** CRUD - Eliminar: oculta una noticia (base o creada) y lo recuerda en localStorage. */
  eliminar(id: number): void {
    this.eliminadas.update((lista) => (lista.includes(id) ? lista : [...lista, id]));
    this.extra.update((lista) => lista.filter((n) => n.id !== id));
    guardarLS(LS_ELIMINADAS, this.eliminadas());
    guardarLS(LS_EXTRA, this.extra());
  }
}
