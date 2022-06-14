// Obtiene product funcion
productId = null;
const getProducts = (tag) => {
    return fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({tag: tag})
    })
    .then(res => res.json())
    .then(data => {
        return data
    })
}

const createProductCards = (data, title, ele) => {
    if(data.length){
        let container = document.querySelector(ele);
        container.innerHTML += `
            <h1 class="section-title">${title}</h1>
            <div class="product-container">
                ${createCards(data)}
            </div>
        `;
    }
}

const createCards = data => {
    let cards = '';

    data.forEach(item => {
        if(item.id != productId){
            cards += `
            <div class="productCard">
                <img src="${item.image}" onclick="location.href = '/products/${item.id}'" class="productImg" alt="">
                <p class="productName">${item.name} →</p>
            </div>
        `
        }
    })

    return cards;
}

// cart function

const add_product_to_cart = product => {
    let cart = JSON.parse(localStorage.getItem('cart'));

    if(cart == null){
        cart = []
    }

    product = {
        item: 1,
        name: product.name,
        price: product.price,
        shortDes: product.shortDes,
        image: product.image
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateNavCartCounter();
    return 'Agregado';
}