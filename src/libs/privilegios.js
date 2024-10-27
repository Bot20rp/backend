export function privilegios(objeto){
  return objeto.map((permiso)=>({
    ...permiso,Estado:permiso.Estado ==1
  }))
}