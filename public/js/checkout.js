window.onload = () => {
    if(!sessionStorage.user){
        location.replace('/login')
    }
}

// order button
const placeOrderBtn = document.querySelector('.placeOrderBtn');

placeOrderBtn.addEventListener('click', () => {
    let address = getAddress();
    
    fetch('/stipe-checkout', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cart')),
            address: address,
            email: JSON.parse(sessionStorage.user).email
        })
    })
    .then(res => res.json())
    .then(url => {
        console.log(url)
    })
})

const getAddress = () => {
    // form validation
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let pincode = document.querySelector('#pincode').value;
    let landmark = document.querySelector('#landmark').value;

    if(!address.length || !street.length || !city.length || !state.length || !pincode.length || !landmark.length){
        return showFormError("LLene todos los campos");
    } else{
        return { address, street, city, state, pincode, landmark }
    }
}