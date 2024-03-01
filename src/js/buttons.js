// Game`s buttons wrapper
const gameButtons = document.createElement('div');
gameButtons.classList.add('game__buttons');
gameButtons.classList.add('buttons');

// Start new
const buttonNew = document.createElement('div');
buttonNew.classList.add('buttons__new');
buttonNew.classList.add('button');
buttonNew.innerHTML = '<span>Start New</span>';

// Continue button
const buttonContinue = document.createElement('div');
buttonContinue.classList.add('buttons__continue');
buttonContinue.classList.add('button');
buttonContinue.innerHTML = '<span>Continue</span>';

// Reload button
const buttonReload = document.createElement('div');
buttonReload.classList.add('buttons__reload');
buttonReload.classList.add('button');
buttonReload.innerHTML = '<span>Reload</span>';

buttonReload.addEventListener('click', () => {
  // eslint-disable-next-line no-console
  console.log('hi');
});

// Save game button
const buttonSave = document.createElement('div');
buttonSave.classList.add('buttons__save');
buttonSave.classList.add('button');
buttonSave.innerHTML = '<span>Save</span>';

// Solution button
const buttonSolution = document.createElement('div');
buttonSolution.classList.add('buttons__solution');
buttonSolution.classList.add('button');
buttonSolution.innerHTML = '<span>Solution</span>';

// Settings button
const buttonSettings = document.createElement('div');
buttonSettings.classList.add('buttons__setting');
buttonSettings.classList.add('button');
buttonSettings.innerHTML = '<span>Settings</span>';

// Leaderboard button
const buttonLeaderBoard = document.createElement('div');
buttonLeaderBoard.classList.add('buttons__leaderboard');
buttonLeaderBoard.classList.add('button');
buttonLeaderBoard.innerHTML = '<span>Leaderboard</span>';

export {
  gameButtons, buttonReload, buttonSettings, buttonNew, buttonContinue, buttonLeaderBoard,
  buttonSave, buttonSolution,
};
