document.addEventListener('DOMContentLoaded', function() {
    // Ejemplo de solicitud POST para registrar un usuario
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        const registerData = {
            nombre: formData.get('nombre'),
            edad: formData.get('edad'),
            email: formData.get('email'),
            pais: formData.get('pais'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/api/usuario/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }

            const data = await response.json();
            console.log('Usuario registrado:', data);
            // Aquí podrías redirigir o actualizar la interfaz de usuario según necesites
        } catch (error) {
            console.error('Error:', error);
            // Manejo de errores aquí
        }
    });
});
