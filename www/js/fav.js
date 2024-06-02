function toggleFavorite(event, button) {
    // Prevent the link from being followed when the button is clicked
    event.stopPropagation();
    event.preventDefault();

    button.classList.toggle('added');
    const icon = button.querySelector('.favorite-icon');
    if (button.classList.contains('added')) {
        button.innerHTML = '<span class="favorite-icon">★</span> Añadido a Favoritos';
    } else {
        button.innerHTML = '<span class="favorite-icon">☆</span> Añadir a Favoritos';
    }
}
