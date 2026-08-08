import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const ROLES = ['ADMINISTRADOR','DIRECTOR','PROFESOR','ESTUDIANTE','ACUDIENTE'] as const
export type Rol = typeof ROLES[number]

export async function login(email:string,password:string){
 const user=await prisma.usuario.findUnique({where:{email}})
 if(!user || user.estado!=='ACTIVO' || !(await bcrypt.compare(password,user.passwordHash))) return null
 const token=Buffer.from(JSON.stringify({id:user.id,rol:user.rol})).toString('base64url')
 const store=await cookies(); store.set('session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*8})
 return user
}

export async function session(){
 const raw=(await cookies()).get('session')?.value
 if(!raw) return null
 try { const data=JSON.parse(Buffer.from(raw,'base64url').toString()); return prisma.usuario.findUnique({where:{id:data.id}}) } catch { return null }
}

export async function requireRole(roles:Rol[]){
 const user=await session(); if(!user) redirect('/login')
 if(!roles.includes(user.rol as Rol)) redirect('/no-autorizado')
 return user
}

export async function logout(){(await cookies()).delete('session')}
