import {createProductCard} from "./productCard.js";

let categoryId;
let hardcodedCategory = [{   
    "id": 1,
    "name": "bebida energetica"
}];
let harcodedProducts = [{
    "id": 5,
    "name": "ENERGETICA MR BIG",
    "urlImage": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
    "price": 1490.0,
    "discount": 20,
    "category": {
        "id": 1,
        "name": "bebida energetica"
    }
},
{
    "id": 6,
    "name": "ENERGETICA RED BULL",
    "urlImage": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
    "price": 1490.0,
    "discount": 0,
    "category": {
        "id": 1,
        "name": "bebida energetica"
    }
},
{
    "id": 7,
    "name": "ENERGETICA SCORE",
    "urlImage": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
    "price": 1290.0,
    "discount": 0,
    "category": {
        "id": 1,
        "name": "bebida energetica"
    }
}];

let searchInput = document.querySelector('#searchInput');
document.querySelector('#searchBtn').addEventListener('click', searchHandler);

function searchHandler(){
    if(categoryId){
        loadProductsBySearchInCategory();
    }
    else{
        loadProductsBySearchAll();
    }
}

async function getCategoriesForDropdown() {
    await fetch('http://www.localhost:8080/api/categories')
      .then((response) => response.json())
      .then((data) => {
        let dropdownMenu = document.querySelector('#dropdown-menu');
        populateDropdown(dropdownMenu, data);
    }).catch(populateDropdown(dropdownMenu, hardcodedCategory))
}
getCategoriesForDropdown();

function populateDropdown(dropdown, categories){
    categories.forEach(category => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.classList.add("dropdown-item");
        a.id = category.id;
        a.href = "#";
        a.text =  category.name.charAt(0).toUpperCase() +  category.name.slice(1);
        a.addEventListener('click', loadProductsByCategory);
        li.appendChild(a);
        dropdown.appendChild(li);
    });
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.classList.add("dropdown-item");
    a.href = "#";
    a.text =  "All products";
    a.addEventListener('click', loadAllProducts);
    li.appendChild(a);
    dropdown.appendChild(li);
    return dropdown;
};

async function loadAllProducts(){
    categoryId = null;
    await fetch(`http://www.localhost:8080/api/products`)
    .then((response) => response.json())
    .then((data) => {
      let div = document.querySelector('#products');
      div.innerHTML = "";
      data = sortNameAscending(data);
      data.forEach(product => div.appendChild(createProductCard(product)));
    })
};

async function loadProductsByCategory(category){
    categoryId = category.target.id;
    await fetch(`http://www.localhost:8080/api/product?category=${categoryId}`)
    .then((response) => response.json())
    .then((data) => {
      let div = document.querySelector('#products');
      div.innerHTML = "";
      data = sortNameAscending(data);
      data.forEach(product => div.appendChild(createProductCard(product)));
  }).catch(harcodedProducts.forEach(product => div.appendChild(createProductCard(product))))
};

async function loadProductsBySearchAll(){
    let searchString = searchInput.value;
    await fetch(`http://www.localhost:8080/api/product?name=${searchString}`)
    .then((response) => response.json())
    .then((data) => {   
      let div = document.querySelector('#products');
      div.innerHTML = "";
      data = sortNameAscending(data);
      data.forEach(product => div.appendChild(createProductCard(product)));
  }).catch( x => console.log("Not found"));
}

async function loadProductsBySearchInCategory(){
    let searchString = searchInput.value;
    await fetch(`http://www.localhost:8080/api/product?name=${searchString}&category=${categoryId}`)
    .then((response) => response.json())
    .then((data) => {   
      let div = document.querySelector('#products');
      div.innerHTML = "";
      data = sortNameAscending(data);
      data.forEach(product => div.appendChild(createProductCard(product)));
    }).catch( x => console.log("Not found"));
};

function sortNameAscending(data){
    data.sort((a, b) => {
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0;
      });
    return data;
}