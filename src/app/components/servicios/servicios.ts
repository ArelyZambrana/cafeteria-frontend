import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Reveal } from '../../directives/reveal';
import { DataService } from '../../services/data';

@Component({
  imports: [Reveal],
  selector: 'app-servicios',
  styleUrl: './servicios.css',
  templateUrl: './servicios.html',
})
export class Servicios {
  private readonly dataService = inject(DataService);

  protected readonly seccion = toSignal(this.dataService.getSeccion('servicios'));
  // undefined = cargando, null = error, arreglo = listo
  protected readonly servicios = toSignal(this.dataService.getServicios().pipe(catchError(() => of(null))));
}
