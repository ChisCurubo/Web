document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const responseContainer = document.getElementById('responseContainer');

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar que las contraseñas coincidan
        const contrasena = document.getElementById('contrasena').value;
        const confirmarContrasena = document.getElementById('confirmarContrasena').value;
        
        if (contrasena !== confirmarContrasena) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        // Obtener los datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            correo: document.getElementById('correo').value,
            contrasena: contrasena,
            confirmarContrasena: confirmarContrasena,
            rol: parseInt(document.getElementById('rol').value)
        };
        
        // Enviar los datos al servidor
        fetch('http://localhost:3001/auth/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            mostrarRespuesta(data);
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarRespuesta({
                success: false,
                mensaje: `Error al conectar con el servidor: ${error.message}`
            });
        });
    });
    
    function mostrarRespuesta(data) {
        // Limpiar el contenedor de respuesta
        responseContainer.innerHTML = '';
        
        // Crear elementos para mostrar la respuesta
        const grid = document.createElement('div');
        grid.className = 'response-grid';
        
        // Crear elemento para 'success'
        const successItem = document.createElement('div');
        successItem.className = 'response-item';
        
        const successLabel = document.createElement('span');
        successLabel.className = 'response-label';
        successLabel.textContent = 'Estado:';
        
        const successValue = document.createElement('span');
        successValue.className = `response-value ${data.success ? 'success-value' : ''}`;
        successValue.textContent = data.success ? 'Éxito' : 'Error';
        
        successItem.appendChild(successLabel);
        successItem.appendChild(successValue);
        
        // Crear elemento para 'mensaje'
        const mensajeItem = document.createElement('div');
        mensajeItem.className = 'response-item';
        
        const mensajeLabel = document.createElement('span');
        mensajeLabel.className = 'response-label';
        mensajeLabel.textContent = 'Mensaje:';
        
        const mensajeValue = document.createElement('span');
        mensajeValue.className = 'response-value';
        mensajeValue.textContent = data.mensaje;
        
        mensajeItem.appendChild(mensajeLabel);
        mensajeItem.appendChild(mensajeValue);
        
        // Agregar elementos al grid
        grid.appendChild(successItem);
        grid.appendChild(mensajeItem);
        
        // Agregar grid al contenedor
        responseContainer.appendChild(grid);
        
        // Mostrar el contenedor
        responseContainer.classList.remove('hidden');
        responseContainer.classList.add('visible');
        
        // Desplazarse suavemente hacia la respuesta
        responseContainer.scrollIntoView({ behavior: 'smooth' });
    }
});