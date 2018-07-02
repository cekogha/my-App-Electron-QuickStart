const electron = require('electron');
const {
    ipcRenderer
} = electron;

const ul = document.querySelector('ul');

// Function create a card to display
function createItem(item){

    // li (collection-item) > div = title > a (secondary-content) > i (material-icons) = send
    const i = document.createElement('i');
    i.setAttribute("class", "material-icons");
    const icon = document.createTextNode('access_time');
    i.appendChild(icon);

    const irmv = document.createElement('i');
    irmv.setAttribute("class", "material-icons");
    const iconrmv = document.createTextNode('delete');
    irmv.appendChild(iconrmv);
    
    // a
    const a = document.createElement('a');
    a.setAttribute("class", "secondary-content");
    a.appendChild(i);

    // const armv = document.createElement('a');
    // armv.setAttribute("class", "delete-content");
    // armv.appendChild(irmv);

    // div
    const div = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    // const p5rmv = document.createElement('p');
    div.setAttribute("class", "separator-grid");
    const title = document.createTextNode(item.title);
    const description = document.createTextNode(item.description);
    const nbLi = document.createTextNode(ul.getElementsByTagName('li').length);
    p1.appendChild(nbLi);
    p2.appendChild(title);
    p3.appendChild(description);
    p4.appendChild(a);
    // p5rmv.appendChild(armv);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    // div.appendChild(p5rmv);
    
    // li
    const li = document.createElement('li');
    li.setAttribute("class", "collection-item");
    li.appendChild(div);

    return li;

}

// Catch item
ipcRenderer.on('item:add', function (e, item) {
    ul.appendChild(createItem(item));
    console.log(ul);
})

// Clear item
ipcRenderer.on('item:clear', function (e, item) {
    console.log('list is deleted...');
    removeElementsByClass('collection-item');

})

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// Remove item
const litoRmv = document.querySelector('li');
// const btnRmv = document.getE('');
litoRmv.addEventListener('dblclick', removeItem);
function removeItem(e) {
    console.log(litoRmv.className);
    if(litoRmv.className == "collection-item"){
        e.target.remove();
    }
}