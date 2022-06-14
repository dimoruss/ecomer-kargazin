window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace('/');
        }
    }
}

// form
let formBtn = document.querySelector('.submitBtn');
let loader = document.querySelector('.loader');

formBtn.addEventListener('click', () => {
    let fullname = document.querySelector('#name') || null;
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let number = document.querySelector('#number') || null;
    let tac = document.querySelector('#tc') || null;

    if(fullname != null){
        // form valid
        if(fullname.value.length < 3){
            showFormError('El nombre debe tener 3 letras minimo');
        } else if(!email.value.length){
            showFormError('Ingrese su email');
        } else if(password.value.length < 8){
            showFormError('El password debe tener mas de 8 caractres');
        } else if(Number(number) || number.value.length < 10){
            showFormError('Numero invalido');
        } else if(!tac.checked){
            showFormError('Debe aceptar los terminos y condiciones');
        } else{
            // submit form
            loader.style.display = 'block';
            sendData('/signup', {
                name: fullname.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tac: tac.checked
            })
        }
    } else{// login 
        if(!email.value.length || !password.value.length){
            showFormError('Llene todos los datos')
        } else{
            // submit form
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value
            })
        }
    }
})