// navbar

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if(scrollY >= 180){
        navbar.classList.add('bg');
    } else{
        navbar.classList.remove('bg');
    }
})

const createNavbar = () => {
    let navbar = document.querySelector('.navbar');

    navbar.innerHTML += `
    
        <ul class="linksContainer">
        <li class="link-item"><a href="#" class="link active">HOME</a></li>
            <li class="linkItem"><a href="#" class="link">TOURS</a></li>
            <li class="linkItem"><a href="#" class="link">Sobre Nosotros</a></li>
            <li class="linkItem"><a href="#" class="link">Contacto</a></li>
        </ul>
        <div class="userInteractions">
            <div class="cart" onclick="location.href = '/cart'">
                <img src="../img/cart.png" class="cart-icon" alt="">
                <span class="cartItemCount">0</span>
            </div>
            <div class="user">
                <img src="../img/user.png" class="userIcon" alt="">
                <div class="userIconPopup">
                    <p>Entre a su cuenta</p>
                    <a>Login</a>
                </div>
            </div>
        </div>

    `
}

createNavbar();

// user icon popup

let userIcon = document.querySelector('.userIcon');
let userPopupIcon = document.querySelector('.userIconPopup');

userIcon.addEventListener('click', () => userPopupIcon.classList.toggle('active'))

let text = userPopupIcon.querySelector('p');
let actionBtn = userPopupIcon.querySelector('a');
let user = JSON.parse(sessionStorage.user || null);

if(user != null){ // user is logged in
    text.innerHTML = `Hola ${user.name}`;
    actionBtn.innerHTML = 'log out';
    actionBtn.addEventListener('click', () => logout());
} else{
    text.innerHTML = 'Entre a su cuenta';
    actionBtn.innerHTML = 'login';
    actionBtn.addEventListener('click', () => location.href = '/login');
}

const logout = () => {
    sessionStorage.clear()
    location.reload();
}

// nav cart conteo

const updateNavCartCounter = () => {
    let cartCounter = document.querySelector('.cartItemCount');

    let cartItem = JSON.parse(localStorage.getItem('cart'));

    if(cartItem == null){
        cartCounter.innerHTML = '0';
    } else{
        if(cartItem.length > 9){
            cartCounter.innerHTML = '9+';
        } else if(cartItem.length <= 9){
            cartCounter.innerHTML = `0${cartItem.length}`
        }
    }
}

updateNavCartCounter();