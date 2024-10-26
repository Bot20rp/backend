export function obtenerHoraActual() {
  const now = new Date();

  const hora = new Intl.DateTimeFormat('es-ES', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'America/La_Paz' // Zona horaria de Bolivia
  }).format(now);
  return hora;
}
console.log(obtenerHoraActual())
export function obtenerFechaactual() {
    const now = new Date();
    const fecha = now.toLocaleDateString('en-EN');
   
    return `${fecha}`;
  }
  console.log(obtenerFechaactual())