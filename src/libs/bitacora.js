export function obtenerHoraActualBolivia() {
  // Crear una nueva fecha y ajustarla a la zona horaria de Bolivia (UTC -4)
  const now = new Date().toLocaleString("es-BO", {
      timeZone: "America/La_Paz",
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false  // Formato de 24 horas
  });

  return now;
}


export function obtenerFechaactual() {
    const now = new Date();
    const fecha = now.toLocaleDateString('en-EN');
   
    return `${fecha}`;
  }
  console.log(obtenerFechaactual())