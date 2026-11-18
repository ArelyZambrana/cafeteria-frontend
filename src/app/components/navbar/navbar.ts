import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { DataService } from '../../services/data';

@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  private readonly dataService = inject(DataService);

  // Nombre de la cafetería y menú vienen de la API
  protected readonly cafeteria = toSignal(this.dataService.getCafeteria().pipe(catchError(() => of(null))));
  protected readonly secciones = toSignal(this.dataService.getSecciones().pipe(catchError(() => of(null))));
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
