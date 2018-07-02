const electron = require('electron');
const {
    ipcRenderer
} = electron;

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault(e);
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const item = {
        "title" : title,
        "description" : description
    };

    ipcRenderer.send('item:add', item);
}