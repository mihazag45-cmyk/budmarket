function filterProducts(category){
    let cards = document.querySelectorAll(".product-card");

    cards.forEach(card=> {
        let cardCategory = card.dataset.category;

        if (category === 'all' || cardCategory === category){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".cart-button").forEach(button => {

    button.addEventListener("click", function(){

        let card = this.closest(".product-card");

        let name = card.dataset.name;
        let price = card.dataset.price;

        let existingProduct = cart.find(product => product.name === name);

        if(existingProduct){
            existingProduct.quantity += 1;
        } else {

            let product = {
                name: name,
                price: price,
                quantity: 1
            };

            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

       showCartAlert(name);

    });

});

function loadCart(){
    
    let cart =JSON.parse(localStorage.getItem("cart")) ||[];

    let cartList = document.querySelector(".cart-list");

    if (!cartList) return;

    cartList.innerHTML = "";

    let total=0;

    cart.forEach((product, index) =>{

        let item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `
            <p>${product.name}</p>
            <p>${product.price} грн</p>
            
            <div class ="quantity">
                <button onclick ="changeQuantity(${index}, -1)">-</button>
                <span>${product.quantity}</span>
                <button onclick ="changeQuantity(${index}, +1)">+</button>
            </div>

            <button class ="remove-btn" onclick="removeFromCart(${index})">Видалити</button>
        `;

        cartList.appendChild(item);

        total += parseInt(product.price) * product.quantity;
    });

    document.getElementById("total-price").textContent = total;

}

loadCart();

function removeFromCart(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity> 1 ){
        cart[index].quantity -=1;
    } else{
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("input", function () {

        let searchText = this.value.toLowerCase();

        let products = document.querySelectorAll(".product-card");

        products.forEach(product => {

            let productName = product.querySelector("h3").textContent.toLowerCase();

            if (productName.includes(searchText)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

    });
}

function showCartAlert(productName){

    let alertBox = document.getElementById("cart-alert");

    alertBox.textContent="✔ " + productName +" додано у кошик";
    alertBox.classList.add("show")

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 2000);

}

function changeQuantity(index, change){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += change;

    if(cart[index].quantity <= 0){
        cart.splice(index,1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

function clearCart (){
    localStorage.removeItem("cart");
    loadCart();
}

function scrollToProducts(){
    document.querySelector(".popular-products").scrollIntoView({
        behavior:"smooth"
    });
}