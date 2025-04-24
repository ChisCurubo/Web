// 📄 Cheatsheet de fetch en TypeScript

// 🔹 1. GET (obtener datos)
fetch('https://api.ejemplo.com/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))

// 🔹 2. POST (enviar datos)
fetch('https://api.ejemplo.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ nombre: 'Juan', edad: 30 })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))

// 🔹 3. PUT (reemplazar datos)
fetch('https://api.ejemplo.com/data/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ nombre: 'Pedro', edad: 40 })
})
  .then(res => res.json())
  .then(data => console.log(data))

// 🔹 4. PATCH (modificar parcialmente)
fetch('https://api.ejemplo.com/data/1', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ edad: 45 })
})
  .then(res => res.json())
  .then(data => console.log(data))

// 🔹 5. DELETE (eliminar un recurso)
fetch('https://api.ejemplo.com/data/1', {
  method: 'DELETE'
})
  .then(res => res.ok ? 'Eliminado correctamente' : 'Error al eliminar')
  .then(msg => console.log(msg))

// 🔹 6. GET con headers personalizados (tokens, auth, etc.)
fetch('https://api.ejemplo.com/data', {
  headers: {
    'Authorization': 'Bearer TU_TOKEN'
  }
})
  .then(res => res.json())
  .then(data => console.log(data))

// 🔹 7. Manejo de errores más robusto
fetch('https://api.ejemplo.com/data')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return res.json()
  })
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err.message))

// 🔹 8. Abortar una petición (cancelar)
const controller = new AbortController()
const signal = controller.signal

fetch('https://api.ejemplo.com/lento', { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.warn('Petición abortada')
    } else {
      console.error(err)
    }
  })

// Abortar después de 3 segundos
setTimeout(() => controller.abort(), 3000)
