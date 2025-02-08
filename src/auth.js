const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';
const HIGH_SCORES_KEY = 'highScores';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getHighScores() {
  return JSON.parse(localStorage.getItem(HIGH_SCORES_KEY)) || {};
}

function saveHighScores(highScores) {
  localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores));
}

function addUser(username, password) {
  const users = getUsers();
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return false;
  }
  users.push({ username, password });
  saveUsers(users);
  return true;
}

function login(username, password) {
  const users = getUsers();
  const foundUser = users.find(user => user.username === username && user.password === password);
  if (foundUser) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function isAuthenticated() {
  return localStorage.getItem(CURRENT_USER_KEY) !== null;
}

function addHighScore(gameName, username, score) {
  const highScores = getHighScores();
  if (!highScores[gameName]) {
    highScores[gameName] = [];
  }
  const existingScoreIndex = highScores[gameName].findIndex(entry => entry.username === username);
  if (existingScoreIndex !== -1) {
    if (highScores[gameName][existingScoreIndex].score < score) {
      highScores[gameName][existingScoreIndex].score = score;
    }
  } else {
    highScores[gameName].push({ username, score });
  }
  saveHighScores(highScores);
}

function getHighestScoreForGame(gameName) {
  const highScores = getHighScores();
  if (highScores[gameName]) {
    const sortedScores = highScores[gameName].sort((a, b) => b.score - a.score);
    return sortedScores[0];
  }
  return 0;
}

function getCurrentUserHighestScoreForGame(gameName) {
  const currentUser = getCurrentUser();
  const highScores = getHighScores();
  if (currentUser && highScores[gameName]) {
    const userScoreEntry = highScores[gameName].find(entry => entry.username === currentUser.username);
    return userScoreEntry ? userScoreEntry.score : 0;
  }
  return 0;
}

export { getUsers, saveUsers, addUser, login, logout, getCurrentUser, isAuthenticated, addHighScore, getHighestScoreForGame, getCurrentUserHighestScoreForGame };
