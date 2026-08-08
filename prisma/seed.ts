import { PrismaClient, Rol } from '@prisma/client'
import bcrypt from 'bcryptjs'
const db = new PrismaClient()
async function main() {
 const hash = await bcrypt.hash('Cambiar123!', 12)
 await db.usuario.upsert({where:{email:'admin@nuevoamanecer.edu.co'},update:{},create:{nombre:'Administrador',email:'admin@nuevoamanecer.edu.co',passwordHash:hash,rol:Rol.ADMINISTRADOR}})
 const grados = ['6°','7°','8°','9°'].map(nombre=>({nombre}))
 for (const g of grados) await db.grado.upsert({where:{nombre:g.nombre},update:{},create:g})
 for (const n of ['Matemáticas','Lengua Castellana','Ciencias Naturales','Inglés','Educación Física']) await db.materia.upsert({where:{nombre:n},update:{},create:{nombre:n}})
 for (let n=1;n<=4;n++){const start=new Date(2026, n===1?0:n===2?2:n===3?5:8,1); const end=new Date(2026,n===1?2:n===2?5:n===3?8:11, n===4?15:30); await db.periodo.upsert({where:{numero_anio:{numero:n,anio:2026}},update:{},create:{numero:n,anio:2026,fechaInicio:start,fechaFin:end}})}
 for (const g of ['6°','7°','8°','9°']) {const grado=await db.grado.findUniqueOrThrow({where:{nombre:g}}); await db.grupo.upsert({where:{nombre_gradoId_anio:{nombre:'A',gradoId:grado.id,anio:2026}},update:{},create:{nombre:'A',gradoId:grado.id,anio:2026}})}
 console.log('Seed completado')
}
main().finally(()=>db.$disconnect())
