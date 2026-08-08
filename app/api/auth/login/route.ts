import { NextResponse } from 'next/server'
import { login } from '../../../../lib/auth'
export async function POST(req:Request){try{const body=await req.json();if(typeof body.email!=='string'||typeof body.password!=='string')return NextResponse.json({error:'Datos inválidos'},{status:400});const user=await login(body.email.trim().toLowerCase(),body.password);if(!user)return NextResponse.json({error:'Credenciales inválidas'},{status:401});return NextResponse.json({ok:true,rol:user.rol})}catch{return NextResponse.json({error:'Error de autenticación'},{status:500})}}
