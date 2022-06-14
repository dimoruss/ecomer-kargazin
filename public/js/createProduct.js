const createProduct = (data) => {
    let productContainer = document.querySelector('.productContainer');
    productContainer.innerHTML += `
    <div class="productCard">
        <button class="btn editBtn" onclick="location.href = '/add-product/${data.id}'"><img src="img/edit.png" alt=""></button>
        <button class="btn openBtn" onclick="location.href = '/products/${data.id}'"><img src="img/open.png" alt=""></button>
        <button class="btn deleteBtn" onclick="deleteItem('${data.id}')"><img src="img/delete.png" alt=""></button>
        <img src="${data.image}" class="productImg" alt="">
        <p class="productName">${data.tags[0]} →</p>
    </div>
    `;
}

const deleteItem = (id) => {
    fetch('/delete-product', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'OK'){
            location.reload();
        } else{
            showAlert('Ocurrio un error');
        }
    })
}