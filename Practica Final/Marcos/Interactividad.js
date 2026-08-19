// Variables de estado del juego
let secretNumber;
let remainingAttempts;
const maxAttempts = 3;

// Elementos del DOM
const inputGuess = document.getElementById('userGuess');
const messageText = document.getElementById('message');
const attemptsText = document.getElementById('attempts');
const btnTry = document.getElementById('btnTry');
const btnNewGame = document.getElementById('btnNewGame');

// Inicializar el juego
function initGame() {
  secretNumber = Math.floor(Math.random() * 10) + 1;
  remainingAttempts = maxAttempts;
  
  attemptsText.textContent = remainingAttempts;
  messageText.textContent = '';
  messageText.className = 'message';
  
  inputGuess.value = '';
  inputGuess.disabled = false;
  btnTry.disabled = false;
  btnNewGame.disabled = true;
}

// Validar e intentar adivinar
function checkGuess() {
  const userGuess = parseInt(inputGuess.value);

  // Validar campo vacío o fuera de rango
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    showMessage('Por favor, ingresa un número válido del 1 al 10.', 'error');
    return;
  }

  // Verificar acierto
  if (userGuess === secretNumber) {
    showMessage(`¡Felicidades! Adivinaste el número secreto (${secretNumber}).`, 'success');
    endGame();
    return;
  }

  // Si falla el intento
  remainingAttempts--;
  attemptsText.textContent = remainingAttempts;
  inputGuess.value = ''; // Limpiar el campo

  if (remainingAttempts > 0) {
    const hint = userGuess < secretNumber ? 'mayor' : 'menor';
    showMessage(`Incorrecto. El número secreto es ${hint} que ${userGuess}.`, 'error');
  } else {
    showMessage(`¡Has perdido! El número secreto era el ${secretNumber}.`, 'error');
    endGame();
  }
}

function showMessage(msg, typeClass) {
  messageText.textContent = msg;
  messageText.className = `message ${typeClass}`;
}

function endGame() {
  inputGuess.disabled = true;
  btnTry.disabled = true;
  btnNewGame.disabled = false;
}

function resetGame() {
  initGame();
}

// Iniciar al cargar la página
window.onload = initGame;