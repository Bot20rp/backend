import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

//los helpers son good

function diasfaltantes (fechai,fechaf){
    return (new Date(fechaf)-new Date(fechai))*(1/3600000)*(1/24)
    }
console.log(diasfaltantes('2022-10-10','2024-11-25'))



function renombrarImagenes(nameOriginal,id,nombre){
    const extname = path.extname(nameOriginal); // Obtener la extensión del archivo
    const newImageName = `${nombre}${id}${extname}`; // Nuevo nombre con el ID del producto
    // Usar __dirname para asegurarnos de tener la ruta completa
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log(__dirname)

    // 4. Definir las rutas
    const oldPath = path.join(__dirname, 'image', nameOriginal); // Ruta original
    const newPath = path.join(__dirname, 'image', newImageName);  // Nueva ruta con el nombre del producto
    fs.renameSync(oldPath, newPath);
    return newImageName
}
// console.log(renombrarImagenes('imag.jpeg',1))
export {diasfaltantes,renombrarImagenes}

