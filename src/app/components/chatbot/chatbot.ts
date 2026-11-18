import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { MensajeChat } from '../../models/mensaje';
import { DataService } from '../../services/data';

@Component({
  imports: [FormsModule],
  selector: 'app-chatbot',
  styleUrl: './chatbot.css',
  templateUrl: './chatbot.html',
})
export class Chatbot {
  private readonly dataService = inject(DataService);

  protected readonly cafeteria = toSignal(this.dataService.getCafeteria().pipe(catchError(() => of(null))));
  protected readonly isOpen = signal(false);
  protected readonly mensajes = signal<MensajeChat[]>([]);
  protected readonly escribiendo = signal(false);
  protected texto = '';

  private readonly lista = viewChild<ElementRef<HTMLElement>>('lista');

  protected toggleChat(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  // Envía la pregunta al backend (Node -> Ollama) junto con el historial reciente
  protected enviar(): void {
    const pregunta = this.texto.trim();
    if (!pregunta || this.escribiendo()) {
      return;
    }

    const historial = this.mensajes();
    this.mensajes.update((lista) => [...lista, { role: 'user', content: pregunta }]);
    this.texto = '';
    this.escribiendo.set(true);
    this.bajar();

    this.dataService.preguntarChatbot(pregunta, historial).subscribe({
      next: (respuesta) => this.responder(respuesta.response),
      error: (err) =>
        this.responder(
          err?.error?.error ?? 'No pude conectarme con el asistente. Intenta de nuevo en un momento.',
        ),
    });
  }

  private responder(texto: string): void {
    this.mensajes.update((lista) => [...lista, { role: 'assistant', content: texto }]);
    this.escribiendo.set(false);
    this.bajar();
  }

  // Lleva el scroll al último mensaje
  private bajar(): void {
    setTimeout(() => {
      const el = this.lista()?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
