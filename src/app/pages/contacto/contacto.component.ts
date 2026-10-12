import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX_EMAIL, minTexto } from '../../validators/validadores';

/** Formulario de contacto con validaciones (Reactive Forms). */
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {
  private readonly fb = inject(FormBuilder);

  /** Modelo del formulario: cada campo con sus reglas de validación. */
  readonly form = this.fb.nonNullable.group({
    nombre: ['', [minTexto(3)]],
    email: ['', [Validators.required, Validators.pattern(REGEX_EMAIL)]],
    mensaje: ['', [minTexto(10)]]
  });

  private intentoEnvio = false;
  /** true durante unos segundos tras enviar correctamente (muestra el mensaje de confirmación). */
  readonly confirmado = signal(false);

  /** Un campo se marca como inválido si falla y el usuario ya lo tocó o intentó enviar. */
  invalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || this.intentoEnvio);
  }

  enviar(): void {
    this.intentoEnvio = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Aquí iría el envío a un servidor; en este proyecto solo se confirma en pantalla.
    this.form.reset();
    this.intentoEnvio = false;
    this.confirmado.set(true);
    setTimeout(() => this.confirmado.set(false), 4000);
  }
}
