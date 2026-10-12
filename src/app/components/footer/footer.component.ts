import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Pie de página: navegación, datos de contacto y créditos. */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly anio = new Date().getFullYear();
}
