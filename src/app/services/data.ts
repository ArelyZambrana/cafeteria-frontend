import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { API_URL } from '../config/api';
import { Cafeteria } from '../models/cafeteria';
import { Especialidad } from '../models/especialidad';
import { Foto } from '../models/foto';
import { MensajeChat, MensajeContacto } from '../models/mensaje';
import { Precio } from '../models/precio';
import { Seccion } from '../models/seccion';
import { Servicio } from '../models/servicio';

// Único punto de acceso a la API en Node. Todo el contenido del sitio sale de aquí.
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);

  // Estos dos se piden una sola vez y se comparten entre componentes
  private readonly cafeteria$ = this.http
    .get<Cafeteria>(`${API_URL}/cafeteria`)
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));
  private readonly secciones$ = this.http
    .get<Seccion[]>(`${API_URL}/secciones`)
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  getCafeteria(): Observable<Cafeteria> {
    return this.cafeteria$;
  }

  getSecciones(): Observable<Seccion[]> {
    return this.secciones$;
  }

  getSeccion(clave: string): Observable<Seccion | undefined> {
    return this.secciones$.pipe(map((lista) => lista.find((s) => s.clave === clave)));
  }

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${API_URL}/servicios`);
  }

  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${API_URL}/especialidades`);
  }

  getPrecios(): Observable<Precio[]> {
    return this.http.get<Precio[]>(`${API_URL}/precios`);
  }

  getFotos(): Observable<Foto[]> {
    return this.http.get<Foto[]>(`${API_URL}/fotos`);
  }

  enviarContacto(datos: MensajeContacto): Observable<{ id: number; mensaje: string }> {
    return this.http.post<{ id: number; mensaje: string }>(`${API_URL}/contacto`, datos);
  }

  preguntarChatbot(prompt: string, historial: MensajeChat[]): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(`${API_URL}/chatbot`, { prompt, historial });
  }
}
