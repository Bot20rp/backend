//importar la dep. para crear imagenes
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//configuracion para guardar imagen
const guardar=multer.diskStorage({
    destination:path.join(__dirname,'../libs/image'),
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})

const filtro=(req,file,cb)=>{
    if(file && (file.mimetype ==='image/jpg' || file.mimetype=='image/jpeg'  ||file.mimetype ==='image/png')){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
export const fileUpload=multer({
    storage:guardar,
    fileFilter:filtro
}).single('imagen')
