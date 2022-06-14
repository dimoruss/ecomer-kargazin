// product page setting

let productName = document.querySelector('.productTitle');
let shortDes = document.querySelector('.productDes');
let price = document.querySelector('.price');
let detail = document.querySelector('.des');
let productImage = document.querySelector('.productImage');
let title = document.querySelector('title');

let cartBtn = document.querySelector('.cartBtn');

const setData = (data) => {
    productName.innerHTML = title.innerHTML = data.name;
    productImage.src = data.image;
    shortDes.innerHTML = data.shortDes;
    detail.innerHTML = data.detail;
    price.innerHTML = `$${data.price}`;

    cartBtn.addEventListener('click', () => {
        cartBtn.innerHTML = add_product_to_cart(data);
    })
}

const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data => {
        setData(data)
        getProducts(data.tags[0]).then(res => createProductCards(res, 'mas servicios/productos', '.bestSellingProductSection'))
    })
    .catch(err => {
        console.log(err)
        alert('No se encontro producto');
        location.replace('/404');
    })
}

let productId = null;
if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}