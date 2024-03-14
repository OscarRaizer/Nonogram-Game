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

// Settings buttons wrapper
const settingsButtons = document.createElement('div');
settingsButtons.classList.add('settings__buttons');
settingsButtons.classList.add('buttons');

// Settings button
const buttonSettings = document.createElement('div');
buttonSettings.classList.add('buttons__setting');
buttonSettings.classList.add('button');
buttonSettings.innerHTML = '<span>Settings</span>';

// Sound button

const soundSettings = document.createElement('div');
soundSettings.classList.add('sound__setting');
soundSettings.classList.add('button');
soundSettings.innerHTML = '<span>Sound: on/off</span>';

const backButton = document.createElement('div');
backButton.classList.add('buttons__back');
backButton.classList.add('button');
backButton.innerHTML = '<span>back</span>';

// Leaderboard button
const buttonLeaderBoard = document.createElement('div');
buttonLeaderBoard.classList.add('buttons__leaderboard');
buttonLeaderBoard.classList.add('button');
buttonLeaderBoard.innerHTML = '<span>Leaderboard</span>';

export {
  gameButtons, buttonReload, buttonSettings, buttonNew, buttonContinue, buttonLeaderBoard,
  buttonSave, buttonSolution, soundSettings, settingsButtons, backButton,
};
