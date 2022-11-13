import {createProductCard} from "./productCard.js";

let categoryId;
let searchInput = document.querySelector('#searchInput');
let searchButton = document.querySelector('#searchBtn').addEventListener('click', searchHandler);

function searchHandler(){
    if(categoryId){
        loadProductsBySearch();
    }
    else{
        loadProductsBySearchAll();
    }
}

async function asyncCall() {
    await fetch('http://www.localhost:8080/api/categories')
      .then((response) => response.json())
      .then((data) => {
        let dropdownMenu = document.querySelector('#dropdown-menu');
        populateDropdown(dropdownMenu, data);
    })
}
asyncCall();

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
      data.forEach(product => div.appendChild(createProductCard(product)));
  })
};

async function loadProductsBySearchAll(){
    let searchString = searchInput.value;
    await fetch(`http://www.localhost:8080/api/product?name=${searchString}`)
    .then((response) => response.json())
    .then((data) => {   
      let div = document.querySelector('#products');
      div.innerHTML = "";
      data.forEach(product => div.appendChild(createProductCard(product)));
  }).catch( x => console.log("Not found"));
}

async function loadProductsBySearch(){
    let searchString = searchInput.value;
    await fetch(`http://www.localhost:8080/api/product?name=${searchString}&category=${categoryId}`)
    .then((response) => response.json())
    .then((data) => {   
      let div = document.querySelector('#products');
      div.innerHTML = "";
      data.forEach(product => div.appendChild(createProductCard(product)));
    }).catch( x => console.log("Not found"));
};