import './style.css';

// Wrapper

const nonogramWrapper = document.createElement('div');
nonogramWrapper.classList.add('nonogram__wrapper');
document.body.appendChild(nonogramWrapper);

// ЗАГОЛОВОК

const nonogramTitle = document.createElement('div');
nonogramTitle.classList.add('nonogram__title');
nonogramTitle.innerHTML = '<p>NONOGRAM GAME</p>';
nonogramWrapper.appendChild(nonogramTitle);

// НОНОГРАММА

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
