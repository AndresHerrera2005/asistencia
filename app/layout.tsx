import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata={title:'Nuevo Amanecer · Gestión Escolar',description:'Sistema de gestión académica y administrativa'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
