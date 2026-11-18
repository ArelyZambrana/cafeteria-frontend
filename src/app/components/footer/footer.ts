import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { DataService } from '../../services/data';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  private readonly dataService = inject(DataService);

  protected readonly cafeteria = toSignal(this.dataService.getCafeteria().pipe(catchError(() => of(null))));
  protected readonly secciones = toSignal(this.dataService.getSecciones().pipe(catchError(() => of(null))));
  protected readonly anio = new Date().getFullYear();
}
