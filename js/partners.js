const partners = () => {
    function pageRender(url, div){
        fetch(url)
        .then((responce) => responce.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++){
    
                // отрисовать каждый элемент
                let a = document.createElement("a");
                div.append(a);
                a.className = "card card-restaurant";
                a.setAttribute("href", "/restaurant.html");
                a.innerHTML = `
                <img src="${data[i].image}" alt="image" class="card-image" />
                            <div class="card-text">
                                <div class="card-heading">
                                    <h3 class="card-title">${data[i].name}</h3>
                                    <span class="card-tag tag">${data[i].time_of_delivery} мин</span>
                                </div>
                                <div class="card-info">
                                    <div class="rating">
                                        ${data[i].stars}
                                    </div>
                                    <div class="price">От ${data[i].price} ₽</div>
                                    <div class="category">${data[i].kitchen}</div>
                                </div>
                            </div>
                `
    
                a.addEventListener("click", (e) => {
                    e.preventDefault();
    
                    let obj = data[i];
                    console.log(obj)
                    localStorage.setItem("rest", JSON.stringify(obj));
                    window.location.href = "/restaurant.html";
                })
            }
        })
    }
    
    pageRender('https://test-ebb02-default-rtdb.firebaseio.com/db/partners.json', document.querySelector(".cards-restaurants"));
}

partners();