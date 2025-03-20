# Inserts

INSERT INTO BuenaVista_Roles (nombreRol, descripcion, estadoRol) 
VALUES ('Editor', 'Puede editar productos y gestionar comentarios', 1);

INSERT INTO BuenaVista_Permisos (nombrePermiso, estadoPermiso) 
VALUES ('Gestionar Comentarios', 1);

INSERT INTO BuenaVista_Roles_Permisos (idPermisos, idRol) 
VALUES (5, 3);  -- Asigna el permiso con ID 5 al rol con ID 3


# Permisos
SELECT r.idRol, r.nombreRol, r.descripcion, p.idPermiso, p.nombrePermiso
FROM BuenaVista_Roles r
LEFT JOIN BuenaVista_Roles_Permisos rp ON r.idRol = rp.idRol
LEFT JOIN BuenaVista_Permisos p ON rp.idPermisos = p.idPermiso
WHERE r.idRol = 2;


SELECT r.idRol, r.nombreRol, r.descripcion, p.idPermiso, p.nombrePermiso
FROM BuenaVista_Roles r
LEFT JOIN BuenaVista_Roles_Permisos rp ON r.idRol = rp.idRol
LEFT JOIN BuenaVista_Permisos p ON rp.idPermisos = p.idPermiso;

SELECT * FROM BuenaVista_Permisos;

SELECT * FROM BuenaVista_Permisos 
WHERE idPermiso = 3;

# UPDATES
UPDATE BuenaVista_Roles 
SET nombreRol = 'Gestor', descripcion = 'Administra el contenido y usuarios'
WHERE idRol = 3;

UPDATE BuenaVista_Permisos 
SET nombrePermiso = 'Administrar Productos' 
WHERE idPermiso = 4;

UPDATE BuenaVista_Roles 
SET estadoRol = 0  -- 0 para inactivo, 1 para activo
WHERE idRol = 2;

UPDATE BuenaVista_Permisos 
SET estadoPermiso = 1  -- 0 para inactivo, 1 para activo
WHERE idPermiso = 3;


#DElete
DELETE FROM BuenaVista_Roles_Permisos 
WHERE idRol = 3;

DELETE FROM BuenaVista_Roles 
WHERE idRol = 3;



