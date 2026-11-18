import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Reveal } from '../../directives/reveal';
import { DataService } from '../../services/data';

@Component({
  imports: [ReactiveFormsModule, Reveal],
  selector: 'app-contacto',
  styleUrl: './contacto.css',
  templateUrl: './contacto.html',
})
export class Contacto {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dataService = inject(DataService);

  protected readonly seccion = toSignal(this.dataService.getSeccion('contacto'));
  protected readonly cafeteria = toSignal(this.dataService.getCafeteria().pipe(catchError(() => of(null))));

  protected readonly enviando = signal(false);
  protected readonly exito = signal<string | null>(null);
  protected readonly error = signal<string | null>(null);

  protected readonly contactoForm = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    asunto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  // Envía el formulario a la API (se guarda en MySQL)
  protected enviar(): void {
    this.exito.set(null);
    this.error.set(null);

    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.dataService.enviarContacto(this.contactoForm.getRawValue()).subscribe({
      next: (respuesta) => {
        this.exito.set(respuesta.mensaje);
        this.contactoForm.reset();
        this.enviando.set(false);
      },
      error: (err) => {
        this.error.set(
          err?.error?.error ?? 'No pudimos enviar tu mensaje. Revisa tu conexión e intenta de nuevo.',
        );
        this.enviando.set(false);
      },
    });
  }
}
