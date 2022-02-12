const { ipcRenderer } = require('electron');

document
  .querySelector('#elem')
  .addEventListener('click', () => {
    ipcRenderer.send('click');
  });