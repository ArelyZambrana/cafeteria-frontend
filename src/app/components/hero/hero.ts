import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { rutaVideo } from '../../config/api';
import { DataService } from '../../services/data';

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {
  private readonly dataService = inject(DataService);

  protected readonly cafeteria = toSignal(this.dataService.getCafeteria().pipe(catchError(() => of(null))));
  protected readonly secciones = toSignal(this.dataService.getSecciones().pipe(catchError(() => of(null))));
  protected readonly rutaVideo = rutaVideo;

  // Textos de los botones: salen del menú de secciones (API)
  protected seccion(clave: string) {
    return this.secciones()?.find((s) => s.clave === clave);
  }
}
