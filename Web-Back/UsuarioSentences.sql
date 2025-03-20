SELECT * FROM BuenaVista_Usuarios;


SELECT * FROM BuenaVista_Usuarios WHERE ci = '1001';


SELECT * FROM BuenaVista_Usuarios WHERE estadoUsuario = 1;

SELECT * FROM BuenaVista_Usuarios 
WHERE correoUsuario = 'usuario@ejemplo.com';

SELECT * FROM BuenaVista_Roles 
WHERE idRol = 2;

SELECT u.* 
FROM BuenaVista_Usuarios u
JOIN BuenaVista_Roles r ON u.rol_id = r.idRol
WHERE r.nombreRol = 'Comprador';


DELETE FROM BuenaVista_Usuarios 
WHERE ci = '1001';

DELETE FROM BuenaVista_Usuarios 
WHERE ci = '1001';


UPDATE BuenaVista_Usuarios 
SET contrasenaUsuario = 'Temporal123' 
WHERE correoUsuario = 'usuario@ejemplo.com';



UPDATE BuenaVista_Usuarios 
SET nombreUsuario = 'NuevoNombre', 
    apellidoUsuario = 'NuevoApellido', 
    correoUsuario = 'nuevoemail@ejemplo.com'
WHERE ci = '1001';


# AUTHS
SELECT ci, nombreUsuario, apellidoUsuario, correoUsuario, estadoUsuario, rol_id
FROM BuenaVista_Usuarios 
WHERE correoUsuario = 'admin@buenavista.com' 
AND contrasenaUsuario = 'admin123' 
AND estadoUsuario = 1;

SELECT p.nombrePermiso 
FROM BuenaVista_Usuarios u
JOIN BuenaVista_Roles r ON u.rol_id = r.idRol
JOIN BuenaVista_Roles_Permisos rp ON r.idRol = rp.idRol
JOIN BuenaVista_Permisos p ON rp.idPermisos = p.idPermiso
WHERE u.correoUsuario = 'admin@buenavista.com';

SELECT p.nombrePermiso 
FROM BuenaVista_Usuarios u
JOIN BuenaVista_Roles r ON u.rol_id = r.idRol
JOIN BuenaVista_Roles_Permisos rp ON r.idRol = rp.idRol
JOIN BuenaVista_Permisos p ON rp.idPermisos = p.idPermiso
WHERE u.ci = '1001' AND p.nombrePermiso = 'Ver Productos';


