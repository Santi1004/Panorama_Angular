/**
 * Utilidades para leer y guardar listas en localStorage.
 * Se envuelven en try/catch porque el navegador puede bloquear el almacenamiento
 * (modo privado, cuota llena) o el contenido puede estar dañado.
 */
export function leerLS<T>(clave: string): T[] {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? (JSON.parse(crudo) as T[]) : [];
  } catch {
    return [];
  }
}

export function guardarLS<T>(clave: string, valor: T[]): void {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Sin espacio o almacenamiento bloqueado: la app sigue funcionando sin persistir.
  }
}
