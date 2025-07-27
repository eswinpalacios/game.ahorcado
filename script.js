const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['aplicacion', 'programacion', 'interface', 'desarrollo', 'juego'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Muestra la palabra oculta
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(
            letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
        )
        .join('')}
  `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = '¡Felicidades! ¡Ganaste! 😃';
        popup.style.display = 'flex';
    }
}

// Actualiza las letras incorrectas
function updateWrongLettersEl() {
    // Muestra las letras incorrectas
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Incorrectas</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

    // Muestra las partes del cuerpo
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Comprueba si perdiste
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = '¡Perdiste! 😕';
        popup.style.display = 'flex';
    }
}

// Muestra la notificación
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Event listener para presionar letras
window.addEventListener('keydown', e => {
    // Solo procesa letras
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// Reinicia el juego y juega de nuevo
playAgainBtn.addEventListener('click', () => {
    // Vacía los arreglos
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();
