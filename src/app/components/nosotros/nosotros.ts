import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { rutaFoto } from '../../config/api';
import { Reveal } from '../../directives/reveal';
import { DataService } from '../../services/data';

@Component({
  imports: [Reveal],
  selector: 'app-nosotros',
  styleUrl: './nosotros.css',
  templateUrl: './nosotros.html',
})
export class Nosotros {
  private readonly dataService = inject(DataService);

  protected readonly seccion = toSignal(this.dataService.getSeccion('nosotros'));
  protected readonly cafeteria = toSignal(this.dataService.getCafeteria().pipe(catchError(() => of(null))));
  protected readonly fotos = toSignal(this.dataService.getFotos().pipe(catchError(() => of(null))));
  protected readonly rutaFoto = rutaFoto;

  // Enlace al mapa (OpenStreetMap) con las coordenadas que vienen de la API
  protected readonly enlaceMapa = computed(() => {
    const info = this.cafeteria();
    if (!info || info.latitud === null || info.longitud === null) {
      return null;
    }
    return `https://www.openstreetmap.org/?mlat=${info.latitud}&mlon=${info.longitud}#map=17/${info.latitud}/${info.longitud}`;
  });

  protected ocultarImagen(event: Event): void {
    (event.target as HTMLImageElement).hidden = true;
  }
}
