const { ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('clearCacheButton').addEventListener('click', () => {
    ipcRenderer.send('click');
  });
  document.getElementById('expandContainer').addEventListener('click', () => {
    document.getElementById('pullout').style.display = 'block';
  })
});