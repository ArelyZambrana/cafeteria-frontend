// Dirección del backend en Node (ajústala si cambias el puerto en el .env del backend)
export const API_URL = 'http://localhost:3000/api';

// Los archivos multimedia (fotos y video) están en la carpeta public/ del frontend
export const rutaFoto = (archivo: string): string => `/fotos/${archivo}`;
export const rutaVideo = (archivo: string): string => `/videos/${archivo}`;
