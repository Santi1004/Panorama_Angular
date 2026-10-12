import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Expresión regular para validar el formato de un correo electrónico. */
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validador personalizado: exige un mínimo de caracteres IGNORANDO los espacios
 * al inicio y al final (así "     " no cuenta como texto válido).
 */
export function minTexto(minimo: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const texto = String(control.value ?? '').trim();
    return texto.length >= minimo ? null : { minTexto: { requerido: minimo, actual: texto.length } };
  };
}
