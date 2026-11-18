export interface Horario {
  dia: string;
  horario: string;
}

export interface Cafeteria {
  nombre: string;
  eslogan: string;
  tituloInicio: string;
  subtituloInicio: string;
  videoInicio: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  correo: string;
  historia: string;
  latitud: number | null;
  longitud: number | null;
  saludoChatbot: string;
  horarios: Horario[];
}
