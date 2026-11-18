// Datos que envía el formulario de contacto
export interface MensajeContacto {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
}

// Un mensaje del chat (rol y texto)
export interface MensajeChat {
  role: 'user' | 'assistant';
  content: string;
}
