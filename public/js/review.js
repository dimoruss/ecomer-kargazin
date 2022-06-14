let ratingStarInput = [...document.querySelectorAll('.ratingStar')];
let rate = 0;

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        rate = `${index + 1}.0`;
        for(let i = 0; i < 5; i++){
            if(i <= index){
                ratingStarInput[i].src = `../img/fill star.png`;
            } else{
                ratingStarInput[i].src = `../img/no fill star.png`;
            }
        }
    })
})

// add review form

let reviewHeadline = document.querySelector('.reviewHeadline');
let review = document.querySelector('.reviewField');
let loader = document.querySelector('.loader');

let addReviewBtn = document.querySelector('.addReviewBtn');

addReviewBtn.addEventListener('click', () => {
    // form validation
    if(user.email == undefined){ // Usuario no login
        location.href = `/login?after_page=${productId}`
    } else{
        if(!reviewHeadline.value.length || !review.value.length || rate == 0){
            showFormError('Llene todos los campos');
        } else if(reviewHeadline.value.length > 50){
            showFormError('El titulo debe tener menos de 50 caracteres')
        } else if(review.value.length > 150){
            showFormError('review no debe tener mas de 150 caracteres')
        } else{
            loader.style.display = "block";
            sendData('/add-review', {
                headline: reviewHeadline.value,
                review: review.value,
                rate: rate,
                email: user.email,
                product: productId
            })
        }
    }
})

// fetch reviews

const getReviews = () => {
    if(user == null){
        user = {
            email: undefined
        }
    }

    fetch('/get-reviews', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: user.email,
            product: productId
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.length){
            createReviewSection(data)
        }
    })
}

const createReviewSection = (data) => {
    let section = document.querySelector('.reviewSection');

    section.innerHTML += `
        <h1 class="sectionTitle">Reviews</h1>
        <div class="reviewContainer">
            ${createReviewCard(data)}
        </div>
    `
}

const createReviewCard = data => {
    let cards = '';

    for(let i = 0; i < 4; i++){
        if(data[i]){
            cards += `
            <div class="reviewCard">
                <div class="userDp" data-rating="${data[i].rate}"><img src="../img/user-icon.png" alt=""></div>
                <h2 class="reviewTitle">${data[i].headline}</h2>
                <p class="review">${data[i].review}</p>
            </div>
            `
        }
    }

    return cards;
}

getReviews();