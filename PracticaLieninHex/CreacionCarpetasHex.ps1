# Solicitar el nombre del folder principal
$nombre_principal = Read-Host "Ingrese el nombre del folder"

# Verificar si el nombre del folder está vacío
if ([string]::IsNullOrEmpty($nombre_principal)) {
    Write-Host "El nombre del folder no puede estar vacío."
    exit 1
}

# # Crear la carpeta principal
# New-Item -ItemType Directory -Path $nombre_principal -Force
# Set-Location -Path $nombre_principal

# # Inicializar npm
# Write-Host "Inicializando npm..."
# npm init -y

# # Instalar dependencias
# Write-Host "Instalando dependencias..."
# npm install express
# npm install ts-node ts-node-dev typescript @types/node @types/express -D

# # Inicializar TypeScript
# Write-Host "Configurando TypeScript..."
# npx tsc --init

# Crear estructura de carpetas adicionales
$carpetas_adicionales = @("src", "build", "test", "database", "env", "documents", "scripts")
foreach ($carpeta in $carpetas_adicionales) {
    New-Item -ItemType Directory -Path $carpeta -Force
}

# Pedir al usuario nombres de carpetas para la arquitectura hexagonal
$carpetas_hexagonales = @()
while ($true) {
    $nombre_carpeta = Read-Host "Ingrese el nombre de la carpeta hexagonal dentro de src (o presione Enter para salir)"
    if ([string]::IsNullOrEmpty($nombre_carpeta)) {
        break
    }
    $carpetas_hexagonales += $nombre_carpeta
}

# Crear estructura de carpetas dentro de src
foreach ($carpeta_hex in $carpetas_hexagonales) {
    $ruta_base = "src\$carpeta_hex"
    New-Item -ItemType Directory -Path $ruta_base -Force

    # Crear carpetas dentro de cada módulo
    $estructura = @{
        "domain" = @("interfaces", "port\driver", "port\driven")
        "application" = @("useCase", "service")
        "infraestructure" = @("controller", "routes", "factory")
    }

    foreach ($nivel in $estructura.Keys) {
        $ruta_nivel = "$ruta_base\$nivel"
        New-Item -ItemType Directory -Path $ruta_nivel -Force

        foreach ($subnivel in $estructura[$nivel]) {
            New-Item -ItemType Directory -Path "$ruta_nivel\$subnivel" -Force
        }
    }
}

# Mensaje de confirmación
Write-Host "Proyecto configurado correctamente en la carpeta '$nombre_principal'."
Write-Host "Estructura de carpetas creada:"
Get-ChildItem -Recurse
