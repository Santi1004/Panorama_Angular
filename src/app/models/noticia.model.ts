/** Categorías posibles de una noticia. */
export type Categoria = 'educativas' | 'tecnologicas' | 'turisticas' | 'comerciales';

/** Valor del filtro del catálogo: una categoría o "todas". */
export type FiltroCategoria = 'todas' | Categoria;

/** Nombre legible de cada categoría (para mostrar en pantalla). */
export const CATEGORIAS: Record<Categoria, string> = {
  educativas: 'Educación',
  tecnologicas: 'Tecnología',
  turisticas: 'Turismo',
  comerciales: 'Comercio'
};

/** Estructura de una noticia (coincide con los objetos de data/noticias.json). */
export interface Noticia {
  id: number;
  categoria: Categoria;
  titulo: string;
  descripcionBreve: string;
  descripcionCompleta: string;
  imagen: string;
  fecha: string; // formato AAAA-MM-DD
}

/** Datos que el usuario escribe al publicar una noticia (id y fecha se generan solos). */
export type NuevaNoticia = Omit<Noticia, 'id' | 'fecha'>;
