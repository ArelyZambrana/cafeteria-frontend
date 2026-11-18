import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { rutaFoto } from '../../config/api';
import { Reveal } from '../../directives/reveal';
import { DataService } from '../../services/data';

@Component({
  imports: [Reveal],
  selector: 'app-especialidades',
  styleUrl: './especialidades.css',
  templateUrl: './especialidades.html',
})
export class Especialidades {
  private readonly dataService = inject(DataService);

  protected readonly seccion = toSignal(this.dataService.getSeccion('especialidades'));
  protected readonly especialidades = toSignal(
    this.dataService.getEspecialidades().pipe(catchError(() => of(null))),
  );
  protected readonly rutaFoto = rutaFoto;

  // Si la imagen aún no existe en public/fotos, se oculta y queda el fondo de color
  protected ocultarImagen(event: Event): void {
    (event.target as HTMLImageElement).hidden = true;
  }
}
