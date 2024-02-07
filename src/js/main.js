import '../sass/style.scss';

const pageWrapper = document.createElement('div');
pageWrapper.classList.add('page__wrapper');
document.body.appendChild(pageWrapper);

// ЗАГОЛОВОК

const nonogramTitle = document.createElement('div');
nonogramTitle.classList.add('nonogram__title');
nonogramTitle.innerHTML = '<p>NONOGRAM GAME</p>';
pageWrapper.appendChild(nonogramTitle);

// Wrapper нонограммы

const nonogramWrapper = document.createElement('div');
nonogramWrapper.classList.add('nonogram__wrapper');
pageWrapper.appendChild(nonogramWrapper);

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

nonogramWrapper.appendChild(table);

// НАЧАЛЬНОЕ СОСТОЯНИЕ НОНОГРАММЫ 5x5

const numRows = 5;
const numCols = 5;

function createState() {
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

// ОБРАБОТЧИК СОБЫТИЙ

function clickNonogram(event) {
  const cell = event.target;
  const rowIndex = cell.parentElement.rowIndex;
  const cellIndex = cell.cellIndex;

  const currentValue = initialNonogramState.get(rowIndex, cellIndex);
  const newValue = currentValue === 1 ? 0 : 1;
  initialNonogramState.set(rowIndex, cellIndex, newValue);

  renderNonogram();
}

const cells = document.querySelectorAll('.nonogram-cell');
cells.forEach((cell) => {
  cell.addEventListener('click', clickNonogram);
});

// ДОБАВЛЯЕТ ПОДСКАЗКИ

function generateHints(pattern) {
  const numRows = pattern.length;
  const numCols = pattern[0].length;

  const rowHints = [];
  const colHints = [];

  // Генерация подсказок для строк
  for (let i = 0; i < numRows; i += 1) {
    const row = pattern[i];
    const rowHint = [];
    let count = 0;
    for (let j = 0; j < numCols; j += 1) {
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
  for (let j = 0; j < numCols; j += 1) {
    const colHint = [];
    let count = 0;
    let hasFilledCell = false;
    for (let i = 0; i < numRows; i += 1) {
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

// Шаблон рисунка
const pattern = [
  [0, 1, 0, 1, 1],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 1, 1],
];

const hints = generateHints(pattern);

// Отображение подсказок
function renderHints() {
  const { row: rowHints, col: colHints } = hints;

  // Отображение подсказок для строк
  const rowHintsContainer = document.createElement('div');
  rowHintsContainer.classList.add('hints', 'row-hints');
  nonogramWrapper.appendChild(rowHintsContainer);

  for (let i = 0; i < rowHints.length; i += 1) {
    const rowHint = rowHints[i];
    const rowHintElement = document.createElement('div');
    rowHintElement.classList.add('hint');
    rowHintElement.textContent = rowHint.join(' ');
    rowHintsContainer.appendChild(rowHintElement);
  }

  // Отображение подсказок для столбцов
  const colHintsContainer = document.createElement('div');
  colHintsContainer.classList.add('hints', 'col-hints');
  nonogramWrapper.appendChild(colHintsContainer);

  for (let j = 0; j < colHints.length; j += 1) {
    const colHint = colHints[j];
    const colHintElement = document.createElement('div');
    colHintElement.classList.add('hint');
    colHintElement.textContent = colHint.join('\n');
    colHintsContainer.appendChild(colHintElement);
  }
}
// Отображение сгенерированных подсказок
renderHints();
