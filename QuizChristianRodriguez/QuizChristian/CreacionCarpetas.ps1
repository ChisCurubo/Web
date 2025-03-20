# Solicitar el nombre del folder principal
$nombre_principal = Read-Host "Ingrese el nombre del folder"

# Verificar si el nombre del folder está vacío
if ([string]::IsNullOrEmpty($nombre_principal)) {
    Write-Host "El nombre del folder no puede estar vacío."
    exit 1
}

# Crear la carpeta principal
New-Item -ItemType Directory -Path $nombre_principal -Force
Set-Location -Path $nombre_principal

# Inicializar npm
Write-Host "Inicializando npm..."
npm init -y

# Instalar dependencias
Write-Host "Instalando dependencias..."
npm install express
npm install ts-node ts-node-dev typescript @types/node @types/express -D

# Inicializar TypeScript
Write-Host "Configurando TypeScript..."
npx tsc --init

# Crear estructura de carpetas adicionales
$carpetas_adicionales = @("src", "build", "test", "database", "env")
foreach ($carpeta in $carpetas_adicionales) {
    New-Item -ItemType Directory -Path $carpeta -Force
}

# Crear estructura de carpetas dentro de src
$carpetas_src = @("controller", "factory", "model", "types", "view")
foreach ($carpeta in $carpetas_src) {
    New-Item -ItemType Directory -Path "src\$carpeta" -Force
}

# Mensaje de confirmación
Write-Host "Proyecto configurado correctamente en la carpeta '$nombre_principal'."
Write-Host "Estructura de carpetas creada:"
Get-ChildItem -Recurse