const gameWrapper = document.createElement('div');
gameWrapper.classList.add('game__wrapper');

const gameTitle = document.createElement('div');
gameTitle.classList.add('game__title');
gameTitle.innerHTML = '<p>NONOGRAM GAME</p>';

// Nonogram
const nonogram = document.createElement('div');
nonogram.classList.add('nonogram');
nonogram.classList.add('hidden');

const nonogramWrapper = document.createElement('div');
nonogramWrapper.classList.add('nonogram__wrapper');
nonogramWrapper.classList.add('hidden');

const nonogramButtons = document.createElement('div');
nonogramButtons.classList.add('nonogram__buttons');

export {
  gameWrapper, gameTitle, nonogram, nonogramWrapper, nonogramButtons,
};
