import type { Rol } from './permissions'
export const ROLE_INFO: Record<Rol,{label:string;description:string}> = {
 ADMINISTRADOR:{label:'Administrador',description:'Control total del sistema, usuarios, configuración y datos.'},
 DIRECTOR:{label:'Director',description:'Supervisa la operación académica, administrativa y financiera.'},
 PROFESOR:{label:'Profesor',description:'Gestiona asistencia, calificaciones y consulta sus grupos.'},
 ESTUDIANTE:{label:'Estudiante',description:'Consulta sus calificaciones, asistencia y estado de pagos.'},
 ACUDIENTE:{label:'Acudiente',description:'Consulta la información académica, asistencia y pagos de sus estudiantes.'},
}
