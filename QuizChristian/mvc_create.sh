#!/bin/bash
read -p "Ingrese el nombre del folder: " nombre_principal

if [ -z "$nombre_principal" ]; then
    echo "El nombre del folder no puede estar vacío."
    exit 1
fi

carpetas=("controller" "factory" "model" "types" "view")

for carpeta in "${carpetas[@]}"; do
    mkdir -p "src/$nombre_principal/$carpeta"
done

echo "Estructura creada dentro de '$nombre_principal'"
