// Variables de control
let secretNumber;
let remainingAttempts;
const maxAttempts = 3;

// Elementos del DOM
const inputGuess = document.getElementById('userGuess');
const btnTry = document.getElementById('btnTry');
const feedbackText = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');

// Iniciar / Reiniciar el juego
function resetGame() {
  secretNumber = Math.floor(Math.random() * 10) + 1; // Número aleatorio de 1 a 10
  remainingAttempts = maxAttempts;
  
  attemptsDisplay.textContent = remainingAttempts;
  feedbackText.textContent = '';
  feedbackText.className = 'feedback-text';
  
  inputGuess.value = '';
  inputGuess.disabled = false;
  btnTry.disabled = false;
}

// Función para validar y probar el intento
function checkGuess() {
  const userGuess = parseInt(inputGuess.value);

  // 1. Validar campo vacío o fuera del rango 1-10
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    showFeedback('Por favor, ingresa un número del 1 al 10.', 'error');
    return;
  }

  // 2. Si adivina el número secreto
  if (userGuess === secretNumber) {
    showFeedback(`¡Enhorabuena! Has adivinado el número secreto (${secretNumber}).`, 'success');
    endGame();
    return;
  }

  // 3. Si falla el intento
  remainingAttempts--;
  attemptsDisplay.textContent = remainingAttempts;

  if (remainingAttempts > 0) {
    // Pista clara indicando si el número secreto es mayor o menor
    if (userGuess < secretNumber) {
      showFeedback(`El número secreto es MAYOR que ${userGuess} ↑`, 'hint');
    } else {
      showFeedback(`El número secreto es MENOR que ${userGuess} ↓`, 'hint');
    }
    inputGuess.value = ''; // Limpiar el campo para el siguiente intento
  } else {
    // Si agota los 3 intentos
    showFeedback(`¡Has perdido! El número secreto era el ${secretNumber}.`, 'error');
    endGame();
  }
}

function showFeedback(message, typeClass) {
  feedbackText.textContent = message;
  feedbackText.className = `feedback-text ${typeClass}`;
}

function endGame() {
  inputGuess.disabled = true;
  btnTry.disabled = true;
}

// Ejecutar al cargar el archivo
window.onload = resetGame;