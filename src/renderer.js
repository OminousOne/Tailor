const { ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('clearCacheButton')
  .addEventListener('click', () => {
    ipcRenderer.send('click');
  });
});