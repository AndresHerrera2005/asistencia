export const ROLES = ['ADMINISTRADOR','DIRECTOR','PROFESOR','ESTUDIANTE','ACUDIENTE'] as const
export type Rol = typeof ROLES[number]

export const PERMISSIONS = {
 ADMINISTRADOR: ['dashboard','students:read','students:write','teachers:read','teachers:write','attendance:read','attendance:write','grades:read','grades:write','payments:read','payments:write','reports:read','users:write','settings:write'],
 DIRECTOR: ['dashboard','students:read','students:write','teachers:read','teachers:write','attendance:read','attendance:write','grades:read','grades:write','payments:read','payments:write','reports:read'],
 PROFESOR: ['dashboard','students:read','attendance:read','attendance:write','grades:read','grades:write','reports:read'],
 ESTUDIANTE: ['dashboard','grades:read:self','attendance:read:self','payments:read:self','reports:read:self'],
 ACUDIENTE: ['dashboard','grades:read:children','attendance:read:children','payments:read:children','reports:read:children'],
} as const

export function can(role: Rol, permission: string) { return (PERMISSIONS[role] as readonly string[]).includes(permission) }
