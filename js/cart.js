const cart = () => {
    const cartBtn = document.querySelector(".button-cart");
    const modalCart = document.querySelector(".modal-cart");
    const closeModal = modalCart.querySelector(".close");
    const cartBody = modalCart.querySelector(".modal-body");
    const clearCart = modalCart.querySelector(".clear-cart");
    const cartPrice = modalCart.querySelector(".modal-pricetag");
    const cartSendOrder = modalCart.querySelector(".button-primary");

    cartBtn.addEventListener("click", () => {
        cartBody.innerHTML = "";
        modalCart.style.display = "flex";

        renderItems(JSON.parse(localStorage.getItem("cartItems")));
    });

    closeModal.addEventListener("click", () => {
        modalCart.style.display = "none";
    });

    clearCart.addEventListener("click", () => {
        let emptyArr = [];
        localStorage.setItem("cartItems", JSON.stringify(emptyArr));
        renderItems(emptyArr);
    });

    cartSendOrder.addEventListener("click", () => {
        // let order = JSON.parse(localStorage.getItem("cartItems"));

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: localStorage.getItem("cartItems"),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => {
            if (response.status == 201) {
                alert("Заказ успешно создан!\nМы с вами свяжемся.");
                let emptyArr = [];
                localStorage.setItem("cartItems", JSON.stringify(emptyArr));
                renderItems(emptyArr);
            }
            if (response.status == 404) alert("Ошибка");
        });
    });

    cartBody.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.classList.contains('counter-button-plus')){
            plus(e.target.dataset.index);
        }
        else if (e.target.classList.contains('counter-button-minus')){
            minus(e.target.dataset.index);
        }
    });

    function renderItems(cartItems){
        cartBody.innerHTML = "";
        let price = 0;

        if (cartItems.length != 0){
          for (let i = 0; i < cartItems.length; i++){

            price += cartItems[i].price * cartItems[i].count;

            let item = document.createElement("div");
            item.classList.add("food-row");

            item.innerHTML = `
            <span class="food-name">${cartItems[i].name}</span>
            <strong class="food-price">${cartItems[i].price} ₽</strong>
            <div class="food-counter">
                <button class="counter-button counter-button-minus" data-index="${cartItems[i].id}">-</button>
                <span class="counter">${cartItems[i].count}</span>
                <button class="counter-button counter-button-plus" data-index="${cartItems[i].id}">+</button>
            </div>`;
            
            cartBody.append(item);
            }  
        }
        else{
            cartBody.innerHTML = "";
        }
        cartPrice.innerHTML = `${price} ₽`;
        
    }

    function minus(id){
        let localArr = JSON.parse(localStorage.getItem("cartItems"));

        for (let i = 0; i < localArr.length; i++){
            if (localArr[i].id == id){
                if (localArr[i].count > 1){
                    localArr[i].count--; 
                }
                else{
                    localArr.splice(i, 1);
                }   
            }
        }

        localStorage.setItem("cartItems", JSON.stringify(localArr));
        renderItems(localArr);
    }

    function plus(id){
        let localArr = JSON.parse(localStorage.getItem("cartItems"));

        for (let i = 0; i < localArr.length; i++){
            if (localArr[i].id == id){
                localArr[i].count++; 
            } 
        }

        localStorage.setItem("cartItems", JSON.stringify(localArr));
        renderItems(localArr);
    }
    
}

cart();