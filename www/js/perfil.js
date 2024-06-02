document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (confirm('¿Estás seguro de guardar estos cambios?')) {
        alert('Cambios guardados con éxito.');
        // Aquí podrías agregar la lógica para enviar el formulario al servidor
    } else {
        alert('Cambios no guardados.');
    }
});
