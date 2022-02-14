const { ipcRenderer } = require('electron');
var stepSelection = 0;
function hideMenu() {
  document.getElementById('pullout').style.display = 'none';
  document.getElementById('uiOverlay').style.display = 'none';
  for(const element of document.getElementsByClassName('dropDown')) {
    element.style.backgroundColor = '#21949c';
  }
}
function showMenu() {
  document.getElementById('pullout').style.display = 'block';
  document.getElementById('uiOverlay').style.display = 'block';
  for(const element of document.getElementsByClassName('dropDown')) {
    element.style.backgroundColor = '#4c6b6d';
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('clearCacheButton').addEventListener('click', () => {
    ipcRenderer.send('click');
  });
  document.getElementById('expandContainer').addEventListener('click', () => {
    showMenu();
  });
  document.getElementById('collapse').addEventListener('click',() => {
    hideMenu();
  });
  document.addEventListener('keypress', (key) => {
    if(key.code == 'Enter') {
      hideMenu()
    }
  })
});
//  color: #4c6b6d
