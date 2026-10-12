import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CATEGORIAS, Categoria } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { minTexto } from '../../validators/validadores';

/** Mini CRUD (crear): formulario para publicar una noticia nueva. */
@Component({
  selector: 'app-publicar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './publicar.component.html'
})
export class PublicarComponent {
  private readonly fb = inject(FormBuilder);
  private readonly noticias = inject(NoticiasService);

  /** Pares [valor, texto] para llenar la lista desplegable de categorías. */
  readonly categorias = Object.entries(CATEGORIAS) as [Categoria, string][];

  readonly form = this.fb.nonNullable.group({
    titulo: ['', [minTexto(4)]],
    categoria: ['educativas' as Categoria, [Validators.required]],
    descripcionBreve: ['', [minTexto(6)]],
    descripcionCompleta: ['', [minTexto(11)]],
    // Opcional: si se escribe, debe empezar por http:// o https://
    imagen: ['', [Validators.pattern(/^(https?:\/\/\S+)?$/)]]
  });

  private intentoEnvio = false;
  readonly publicada = signal(false);

  invalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || this.intentoEnvio);
  }

  publicar(): void {
    this.intentoEnvio = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.noticias.crear({
      titulo: v.titulo.trim(),
      categoria: v.categoria,
      descripcionBreve: v.descripcionBreve.trim(),
      descripcionCompleta: v.descripcionCompleta.trim(),
      imagen: v.imagen.trim()
    });
    this.form.reset(); // vuelve a los valores iniciales
    this.intentoEnvio = false;
    this.publicada.set(true);
    setTimeout(() => this.publicada.set(false), 4000);
  }
}
