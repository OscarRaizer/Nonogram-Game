import {
  gameWrapper, gameTitle, nonogram, nonogramClose, nonogramWrapper, nonogramButtons,
} from './const';
import {
  gameButtons, buttonReload, buttonSettings, buttonNew, buttonContinue, buttonLeaderBoard,
  buttonSave, buttonSolution, soundSettings, settingsButtons, backButton,
} from './buttons';

import modalResolve from './modalResolve';

let pattern;

const audio = new Audio('../audio/pizza.mp3');

// HTML rendering
document.body.appendChild(gameWrapper);

gameWrapper.appendChild(gameTitle);

gameWrapper.appendChild(gameButtons);
gameButtons.appendChild(buttonNew);
gameButtons.appendChild(buttonContinue);
gameButtons.appendChild(buttonSettings);
gameButtons.appendChild(buttonLeaderBoard);

gameWrapper.appendChild(nonogramWrapper);
nonogramWrapper.appendChild(nonogram);
nonogram.appendChild(nonogramClose);
nonogramWrapper.appendChild(nonogramButtons);
nonogramButtons.appendChild(buttonReload);
nonogramButtons.appendChild(buttonSave);
nonogramButtons.appendChild(buttonSolution);
settingsButtons.appendChild(backButton);

// ОТРИСОВКА НОНОГРАММЫ
const table = document.createElement('table');

for (let i = 0; i < 5; i += 1) {
  const row = document.createElement('tr');

  for (let j = 0; j < 5; j += 1) {
    const cell = document.createElement('td');
    cell.className = 'nonogram-cell';
    row.appendChild(cell);
  }

  table.appendChild(row);
}

nonogram.appendChild(table);

// НАЧАЛЬНОЕ СОСТОЯНИЕ НОНОГРАММЫ 5x5

const numRows = 5;
const numCols = 5;

export default function createState() {
  const State = new Map();
  return {
    get(row, col) {
      return State.get(`${row}, ${col}`) || 0;
    },
    set(row, col, value) {
      if (value !== 0) {
        State.set(`${row}, ${col}`, value);
      } else {
        State.delete(`${row}, ${col}`);
      }
    },
  };
}

const initialNonogramState = createState();

// ОТОБРАЖЕНИЕ ВЫБОРА

function renderNonogram() {
  const tableRows = table.getElementsByTagName('tr');

  for (let i = 0; i < numRows; i += 1) {
    const cells = tableRows[i].getElementsByTagName('td');

    for (let j = 0; j < numCols; j += 1) {
      const sellValue = initialNonogramState.get(i, j);

      const cell = cells[j];

      cell.style.backgroundColor = sellValue === 1 ? 'black' : 'white';
    }
  }
}
renderNonogram();

// ДОБАВЛЯЕТ ПОДСКАЗКИ

function generateHints() {
  const generateNumRows = pattern.length;
  const generateNumCols = pattern[0].length;

  const rowHints = [];
  const colHints = [];

  // Генерация подсказок для строк
  for (let i = 0; i < generateNumRows; i += 1) {
    const row = pattern[i];
    const rowHint = [];
    let count = 0;
    for (let j = 0; j < generateNumCols; j += 1) {
      if (row[j] === 1) {
        count += 1;
      } else if (count > 0) {
        rowHint.push(count);
        count = 0;
      }
    }
    if (count > 0) {
      rowHint.push(count);
    }
    rowHints.push(rowHint);
  }

  // Генерация подсказок для столбцов
  for (let j = 0; j < generateNumCols; j += 1) {
    const colHint = [];
    let count = 0;
    let hasFilledCell = false;
    for (let i = 0; i < generateNumRows; i += 1) {
      if (pattern[i][j] === 1) {
        count += 1;
        hasFilledCell = true;
      } else if (count > 0) {
        colHint.push(count);
        count = 0;
      }
    }
    if (count > 0) {
      colHint.push(count);
    }
    if (!hasFilledCell) {
      colHint.push(0); // Добавляем 0, если в столбце нет закрашенных ячеек
    }
    colHints.push(colHint);
  }

  return { row: rowHints, col: colHints };
}

// Отображение шифра нонограммы

// clear hints
function clearHints() {
  const existingHints = document.querySelectorAll('.hints');
  existingHints.forEach((hint) => hint.parentNode.removeChild(hint));
}

function renderHints(hints) {
  clearHints();
  const { row: rowHints, col: colHints } = hints;

  // для строк
  const rowHintsContainer = document.createElement('div');
  rowHintsContainer.classList.add('hints', 'row-hints');
  nonogram.appendChild(rowHintsContainer);

  for (let i = 0; i < rowHints.length; i += 1) {
    const rowHint = rowHints[i];
    const rowHintElement = document.createElement('div');
    rowHintElement.classList.add('hint');
    rowHintElement.textContent = rowHint.join(' ');
    rowHintsContainer.appendChild(rowHintElement);
  }

  // для столбцов
  const colHintsContainer = document.createElement('div');
  colHintsContainer.classList.add('hints', 'col-hints');
  nonogram.appendChild(colHintsContainer);

  for (let j = 0; j < colHints.length; j += 1) {
    const colHint = colHints[j];
    const colHintElement = document.createElement('div');
    colHintElement.classList.add('hint');
    colHintElement.textContent = colHint.join('\n');
    colHintsContainer.appendChild(colHintElement);
  }
}

function checkSolution() {
  for (let i = 0; i < numRows; i += 1) {
    for (let j = 0; j < numCols; j += 1) {
      const cellValue = initialNonogramState.get(i, j);
      if (cellValue !== pattern[i][j]) {
        return false;
      }
    }
  }
  return true;
}

// CLEAR NONOGRAM
function resetGame() {
  for (let i = 0; i < numRows; i += 1) {
    for (let j = 0; j < numCols; j += 1) {
      initialNonogramState.set(i, j, 0); // Устанавливаем значение ячейки в 0
    }
  }
  renderNonogram(); // Перерисовываем нонограмму
}

// PARSE JSON

// random
function getRandomPattern(data) {
  const index = Math.floor(Math.random() * data.nonograms.length);
  return data.nonograms[index].pattern;
}

// parse
function initGame() {
  fetch('nonograms.json')
    .then((response) => response.json())
    .then((data) => {
      pattern = getRandomPattern(data);
      const hints = generateHints(pattern);
      renderNonogram(pattern);
      checkSolution(pattern);
      renderHints(hints);
    });
}

// BUTTONS

// START NEW BUTTON
function startGame() {
  buttonNew.addEventListener('click', () => {
    initGame();
    nonogramWrapper.classList.remove('hidden');
    gameButtons.classList.add('hidden');
    resetGame();
  });
}
startGame();

// CONTINUE BUTTON
function continueGame() {
  buttonContinue.addEventListener('click', () => {
    nonogramWrapper.classList.remove('hidden');
    gameButtons.classList.add('hidden');
  });
}
continueGame();

// SETTINGS BUTTON
function settingsButton() {
  buttonSettings.addEventListener('click', () => {
    gameButtons.classList.add('hidden');
    gameWrapper.appendChild(settingsButtons);
    settingsButtons.classList.remove('hidden');
    settingsButtons.appendChild(soundSettings);
  });
}

settingsButton();

// back Button
backButton.addEventListener('click', () => {
  settingsButtons.classList.add('hidden');
  gameButtons.classList.remove('hidden');
});

// sound settings

function soundOnOff() {
  soundSettings.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
}

soundOnOff();

// RELOAD BUTTON
buttonReload.addEventListener('click', () => {
  resetGame();
});

// Button Solution
buttonSolution.addEventListener('click', () => {
  for (let i = 0; i < numRows; i += 1) {
    for (let j = 0; j < numCols; j += 1) {
      const cellValue = pattern[i][j];
      initialNonogramState.set(i, j, cellValue);
    }
  }
  renderNonogram();
});

// CLOSE NONOGRAM
nonogramClose.addEventListener('click', () => {
  nonogramWrapper.classList.add('hidden');
  gameButtons.classList.remove('hidden');
});

// ОБРАБАТЫВАЕТ НАЖАТИЯ ПО НОНОГРАММЕ

function clickNonogram(event) {
  const cell = event.target;
  const { rowIndex } = cell.parentElement;
  const { cellIndex } = cell;

  const currentValue = initialNonogramState.get(rowIndex, cellIndex);
  const newValue = currentValue === 1 ? 0 : 1;
  initialNonogramState.set(rowIndex, cellIndex, newValue);

  renderNonogram();

  if (checkSolution(pattern)) {
    const { modalResolveWrapper, modalClose } = modalResolve();
    modalClose.addEventListener('click', () => {
      modalResolveWrapper.classList.add('hidden');
      nonogramWrapper.classList.add('hidden');
      gameButtons.classList.remove('hidden');
    });
  }
}

const nonogramCells = document.querySelectorAll('.nonogram-cell');
nonogramCells.forEach((cell) => {
  cell.addEventListener('click', clickNonogram);
});
