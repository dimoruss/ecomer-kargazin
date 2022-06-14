let user = JSON.parse(sessionStorage.user || null);

window.onload = () => {
    if(user == null){
        location.replace('/login')
    }
}

let editables = [...document.querySelectorAll('*[contenteditable="true"]')];

editables.map((element) => {
    let placeholder = element.getAttribute('data-placeholder');
    element.innerHTML = placeholder;
    element.addEventListener('focus', () => {
        if(element.innerHTML === placeholder){
            element.innerHTML = '';
        }
    })
    element.addEventListener('focusout', () => {
        if(!element.innerHTML.length){
            element.innerHTML = placeholder;
        }
    })
})

// img upload
let uploadInput = document.querySelector('#uploadImage');
let imagePath = 'img/noImage.png'; // default img

uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    let imageUrl;

    if(file.type.includes('image')){
        // es una imagen?
        fetch('/s3url').then(res => res.json())
        .then(url => {
            fetch(url, {
                method: 'PUT',
                headers: new Headers({'Content-Type': 'image/jpeg'}),
                body: file
            }). then(res => {
                imagePath = url.split("?")[0];

                let productImage = document.querySelector('.productImg');
                productImage.src = imagePath;
            })
        })
    }
})

// form submission

let addProductBtn = document.querySelector('.addProductBtn');
let loader = document.querySelector('.loader');

let productName = document.querySelector('.productTitle');
let shortDes = document.querySelector('.productDes');
let price = document.querySelector('.price');
let detail = document.querySelector('.des');
let tags = document.querySelector('.tags');

addProductBtn.addEventListener('click', () => {

    // verificacion
    if(productName.innerHTML == productName.getAttribute('data-placeholder')){
        showFormError('Ingrese nombre del producto/servisio');
    } else if(shortDes.innerHTML == shortDes.getAttribute('data-placeholder')){
        showFormError('Descripcion corta/titulo debe tener menos de 80 letras');
    } else if(price.innerHTML == price.getAttribute('data-placeholder') || !Number(price.innerHTML)){
        showFormError('Precio invalido');
    } else if(detail.innerHTML == detail.getAttribute('data-placeholder')){
        showFormError('Faltan detalles');
    } else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('Escriba algunos tags');
    } else{
        // submit form
        loader.style.dispaly = 'block';
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/add-product', data)
    }
})

const productData = () => {
    let tagsArr = tags.innerText.split(",");
    tagsArr.forEach((item, i) => tagsArr[i].trim().toLowerCase());

    return {
        name: productName.innerText,
        shortDes: shortDes.innerText,
        price: price.innerText,
        detail: detail.innerText,
        tags: tagsArr,
        image: imagePath,
        email: JSON.parse(sessionStorage.user).email,
        draft: false
    }
}

// Borrador/draft btn
let draftBtn = document.querySelector('.draftBtn');

draftBtn.addEventListener('click', () => {
    if(!productName.innerHTML.length || productName.innerHTML == productName.getAttribute('dataPlaceholder')){
        showFormError('Entre al menos el nombre del producto');
    } else { 
        let data = productData();
        loader.style.dispaly = 'block';
        data.draft = true;
        if(productId){
            data.id = productId;
        }
        sendData('/add-product', data)
    }
})

// edit page

const fetchProductData = () => {
    addProductBtn.innerHTML = 'save product';
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data => {
        setFormData(data)
    })
    .catch(err => console.log(err))
}

const setFormData = (data) => {
    productName.innerHTML = data.name;
    shortDes.innerHTML = data.shortDes;
    price.innerHTML = data.price;
    detail.innerHTML = data.detail;
    tags.innerHTML = data.tags;

    let productImg = document.querySelector('.productImg')
    productImg.src = imagePath = data.image;
}

let productId = null;
if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}