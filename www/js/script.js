document.addEventListener('DOMContentLoaded', function() {
    const fruits = {
        'coaching-button': ['coaching1', 'coaching2', 'coaching3'],
        'health-button': ['apple', 'banana', 'orange'],
        'goals-button': ['goals1', 'goals2', 'goals3'],
        'training-button': ['training1', 'training2', 'training3'],
        'time-button': ['time1', 'time2'],
        'community-button': ['community1', 'community2', 'community3']
    };

    function createFruit(buttonId) {
        const button = document.getElementById(buttonId);
        const fruitType = fruits[buttonId][Math.floor(Math.random() * fruits[buttonId].length)];
        const fruit = document.createElement('img');
        fruit.src = `img/${fruitType}.png`; // Ruta de la imagen de la fruta
        fruit.classList.add('fruit');

        // Obtener las coordenadas del botón
        const buttonRect = button.getBoundingClientRect();
        const buttonX = buttonRect.left + window.scrollX;
        const buttonY = buttonRect.top + window.scrollY;

        // Posicionar la fruta cerca del botón
        fruit.style.left = buttonX + (Math.random() * button.offsetWidth) + 'px';
        fruit.style.top = buttonY + (Math.random() * button.offsetHeight) + 'px';

        setTimeout(() => {
            fruit.remove(); // Eliminar la fruta del DOM
        }, 7000);


        document.body.appendChild(fruit); // Agrega la fruta al body

        // Definir la dirección de movimiento de la fruta
        const moveX = Math.random() * 2 - 1; // Movimiento horizontal aleatorio entre -1 y 1
        const moveY = Math.random() * 2 - 1; // Movimiento vertical aleatorio entre -1 y 1

        // Función para mover la fruta
        function moveFruit() {
            const fruitRect = fruit.getBoundingClientRect();
            const nextX = fruitRect.left + moveX;
            const nextY = fruitRect.top + moveY;

            // Revisar colisión con las paredes
            if (nextX < 0 || nextX + fruitRect.width > window.innerWidth) {
                moveX *= -1; // Cambiar dirección horizontal
            }
            if (nextY < 0 || nextY + fruitRect.height > window.innerHeight) {
                moveY *= -1; // Cambiar dirección vertical
            }

            // Mover la fruta
            fruit.style.left = nextX + 'px';
            fruit.style.top = nextY + 'px';

            // Continuar moviendo la fruta
            requestAnimationFrame(moveFruit);
        }

        // Iniciar la animación de la fruta
        moveFruit();
    }

    // Generar nuevas frutas para cada botón cada segundo
    Object.keys(fruits).forEach(buttonId => {
        setInterval(() => {
            createFruit(buttonId);
        }, 2000); // Ajusta el intervalo de tiempo según lo deseado
    });
});
