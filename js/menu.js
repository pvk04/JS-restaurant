const menu = () => {
    // let cartArray = JSON.parse(localStorage.getItem("cartItems")) || [];

    const renderItems = (data, div) => {
        data.forEach(({ description, id, image, name, price }) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
            <img src="${image}" alt="${name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">
                    ${description}
                    </div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
            </div>
            `;

            card.querySelector(".button-add-cart").addEventListener("click", () => {
                let cartArray = JSON.parse(localStorage.getItem("cartItems")) || [];
                let item = { id, name, price, count: 1 };
                let check = false
                for (elem of cartArray){
                    if (elem.id == item.id){
                        elem.count += 1;
                        check = true
                    }
                }
                if (!check){
                    cartArray.push(item);
                }

                addToCart(cartArray);
            });

            div.append(card);
        });
    }

    const addToCart = (arr) => {
        localStorage.setItem("cartItems", JSON.stringify(arr));
    }
    
    const changeTitle = (restaraunt) => {
        let restTitle = document.querySelector(".restaurant-title");
        restTitle.innerHTML = restaraunt.name;
    
        let restRate = document.querySelector(".rating");
        restRate.innerHTML = restaraunt.stars;
    
        let restPrice = document.querySelector(".price");
        restPrice.innerHTML = `От ${restaraunt.price} ₽`;
    
        let restCategory = document.querySelector(".category");
        restCategory.innerHTML = restaraunt.kitchen;
    }
    
    function renderMenu(url, div){
        fetch(url)
        .then((responce) => responce.json())
        .then((data) => {
            renderItems(data, div);
        })
    }
    
    
    if (localStorage.getItem("rest")){
        let obj = JSON.parse(localStorage.getItem("rest"));
        changeTitle(obj);
        renderMenu(`https://test-ebb02-default-rtdb.firebaseio.com/db/${obj.products}`, document.querySelector(".cards-menu"));
    }
    else{
        window.location.href = "/";
    }
}

menu();