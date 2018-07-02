const electron = require('electron');
const {
    ipcRenderer
} = electron;

const div_cekogha_index_items_list = document.getElementById("list-items");

// Create a card Image
function createCardImage(item){
    const card_image = document.createElement('div');
    card_image.setAttribute("class", "card-image");
    
    // img > card
    const img = document.createElement('img');
    img.setAttribute("src", "assets/img_category_work_01.jpg");
    card_image.appendChild(img);
    // span > card
    const span = document.createElement('span');
    span.setAttribute("class", "card-title");
    // item title > span
    const titleItem = document.createTextNode(item.title);
    span.appendChild(titleItem);
    card_image.appendChild(span);

    return card_image;
}

// Create a Card Content
function createCardContent(item){

    const card_content = document.createElement('div');
    card_content.setAttribute("class", "card-content");
    const p = document.createElement('p');
    // description > p
    const descriptionItem = document.createTextNode(item.description);
    p.appendChild(descriptionItem);
    card_content.appendChild(p);
    
    return card_content;
}

// Create a card Action
function createCardAction(){

    const card_action = document.createElement('div');
    card_action.setAttribute("class", "card-action");
    const a = document.createElement('a');
    a.setAttribute("href", "#");
    card_action.appendChild(a);
    // link > a
    const link = document.createTextNode("This is a link");
    a.appendChild(link);
    card_action.appendChild(a);

    return card_action;
}

// Function create a card to display
function createItem(item){

    const card_index = document.createElement('div');
    card_index.setAttribute("class", "card-index");

    // card > card index
    const card = document.createElement('div');
    card.setAttribute("class", "card");
    card_index.appendChild(card);
    
    // card_image > card
    card.appendChild(createCardImage(item));

    // card_content > card
    card.appendChild(createCardContent(item));

    // card_action > card
    card.appendChild(createCardAction());

    return card_index;

}

// Catch item
ipcRenderer.on('item:add', function (e, item) {
    div_cekogha_index_items_list.appendChild(createItem(item));
    console.log(div_cekogha_index_items_list);
})

// Clear item
ipcRenderer.on('item:clear', function (e, item) {
    div_cekogha_index_items_list.innerHTML = '';
})

// Remove item
div_cekogha_index_items_list.addEventListener('dbclick', removeItem);

function removeItem(e) {
    e.target.remove();
}