// sector productos
const createSmallCards = (data) => {
    return `
    <div class="smProduct">
        <img src="${data.image}" class="smProductImg" alt="">
        <div class="smText">
            <p class="smProductName">${data.name}</p>
            <p class="smDes">${data.shortDes}</p>
        </div>
        <div class="itemCounter">
            <button class="counterBtn decrement">-</button>
            <p class="itemCount">${data.item}</p>
            <button class="counterBtn increment">+</button>
        </div>
        <p class="smPrice" data-price="${data.price}">$${data.price * data.item}</p>
        <button class="smDeleteBtn"><img src="img/close.png" alt=""></button>
    </div>
    `
}

let totalBill = 0;

const setCartProducts = () => {
    const cartContainer = document.querySelector('.cartContainer')

    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart == null || !cart.length){
        cartContainer.innerHTML += `<img src="img/empty-cart.png" class="emptyImg" alt="">`
    } else{
        for(let i = 0; i < cart.length; i++){
            cartContainer.innerHTML += createSmallCards(cart[i]);
            totalBill += Number(cart[i].price * cart[i].item);

            updateBill()
        }
    }
    setupCardEvents();
}

const updateBill = () => {
    updateNavCartCounter();
    let billPrice = document.querySelector('.bill');
    billPrice.innerHTML = `$${totalBill}`;
}

const setupCardEvents = () => {
    // setup counter event
    const counterMinus = document.querySelectorAll('.cartContainer .decrement');
    const counterPlus = document.querySelectorAll('.cartContainer .increment');
    const counts = document.querySelectorAll('.cartContainer .itemCount');
    const price = document.querySelectorAll('.cartContainer .smPrice');
    const deleteBtn = document.querySelectorAll('.cartContainer .smDeleteBtn');

    let product = JSON.parse(localStorage.getItem('cart'));

    counts.forEach((item, i) => {
        let cost = Number(price[i].getAttribute('dataPrice'));

        counterMinus[i].addEventListener('click', () => {
            if(item.innerHTML > 1){
                item.innerHTML--;
                totalBill -= cost;
                updateBill();
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem('cart', JSON.stringify(product));
            }
        })
        counterPlus[i].addEventListener('click', () => {
            if(item.innerHTML < 9){
                item.innerHTML++;
                totalBill += cost;
                updateBill();
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem('cart', JSON.stringify(product));
            }
        })
    })

    deleteBtn.forEach((item, i) => {
        item.addEventListener('click', () => {
            product = product.filter((data, index) => index != i);
            localStorage.setItem('cart', JSON.stringify(product))
            location.reload();
        })
    })
}

setCartProducts();