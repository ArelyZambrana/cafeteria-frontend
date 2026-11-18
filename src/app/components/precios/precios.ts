import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Reveal } from '../../directives/reveal';
import { Precio } from '../../models/precio';
import { DataService } from '../../services/data';

interface GrupoPrecios {
  categoria: string;
  items: Precio[];
}

@Component({
  imports: [Reveal, DecimalPipe],
  selector: 'app-precios',
  styleUrl: './precios.css',
  templateUrl: './precios.html',
})
export class Precios {
  private readonly dataService = inject(DataService);

  protected readonly seccion = toSignal(this.dataService.getSeccion('precios'));
  protected readonly precios = toSignal(this.dataService.getPrecios().pipe(catchError(() => of(null))));

  // Agrupa los productos por categoría para mostrarlos en tarjetas
  protected readonly grupos = computed<GrupoPrecios[]>(() => {
    const grupos = new Map<string, Precio[]>();
    for (const item of this.precios() ?? []) {
      grupos.set(item.categoria, [...(grupos.get(item.categoria) ?? []), item]);
    }
    return [...grupos.entries()].map(([categoria, items]) => ({ categoria, items }));
  });
}
