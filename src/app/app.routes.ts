import { Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { PublicarComponent } from './pages/publicar/publicar.component';

/** Tabla de rutas: cada URL se asocia a un componente (una "página"). */
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'PANORAMA — Plataforma de noticias' },
  { path: 'noticias', component: NoticiasComponent, title: 'Noticias — PANORAMA' },
  { path: 'noticia/:id', component: DetalleComponent, title: 'Detalle de la noticia — PANORAMA' },
  { path: 'favoritos', component: FavoritosComponent, title: 'Favoritos — PANORAMA' },
  { path: 'contacto', component: ContactoComponent, title: 'Contacto — PANORAMA' },
  { path: 'publicar', component: PublicarComponent, title: 'Publicar — PANORAMA' },
  { path: '**', redirectTo: '' }
];
