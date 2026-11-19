import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
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

  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');

  constructor() {
    // Los navegadores solo permiten el autoplay si la propiedad "muted" es true.
    // Con Angular el atributo no basta, así que se fuerza aquí y se inicia la reproducción.
    effect(() => {
      const el = this.video()?.nativeElement;
      if (el) {
        el.muted = true;
        el.play().catch(() => {});
      }
    });
  }

  // Textos de los botones: salen del menú de secciones (API)
  protected seccion(clave: string) {
    return this.secciones()?.find((s) => s.clave === clave);
  }
}
