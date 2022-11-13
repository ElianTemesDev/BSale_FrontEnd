export function createProductCard(product){
    let div = document.createElement('div');
        div.classList.add("product-card");
        div.id = product.id;
        let img = document.createElement('img');
            img.classList.add("product-img");
            img.src = product.urlImage;
            img.alt = "Product photo";
        let spanName = document.createElement('span');
            spanName.classList.add("product-name");
            spanName.innerHTML = product.name;
        let spanPrice = document.createElement('span');
            spanPrice.classList.add("product-price");
            spanPrice.innerHTML = "Price: $ " + product.price;
        let spanDiscount = document.createElement('span');
            spanDiscount.classList.add("product-discount");
            spanDiscount.innerHTML = "Discount: $ " + product.discount;
        div.appendChild(img);
        div.appendChild(spanName);
        div.appendChild(spanPrice);
        div.appendChild(spanDiscount);
    return div;
}