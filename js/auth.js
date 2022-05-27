const auth = () => {
    const modal = document.querySelector(".modal-auth");
    const closeModal = document.querySelector(".close-auth");
    const btnAuth = document.querySelector(".button-auth");
    const btnOut = document.querySelector(".button-out");
    let username = document.querySelector(".user-name");
    const cartBtn = document.querySelector(".button-cart");
    
    function cartFlex(){
        cartBtn.style.display = "flex";
    }
    
    function cartNone(){
        cartBtn.style.display = "none";
    }
    
    
    // аккаунты
    let accounts = [
        {
            login: "alex",
            password: "1234"
        },
        {
            login: "kalavrat",
            password: "slabich"
        },
        {
            login: "evjek",
            password: "punchurin"
        },
        {
            login: "andrew",
            password: "slim"
        }
    ]
    
    
    // загрузка страницы
    document.addEventListener("DOMContentLoaded", () => {
            let user = JSON.parse(localStorage.getItem("user"));
    
            if (user != null){
                username.style.display = "flex";
                username.innerHTML = user;
                btnAuth.style.display = "none";
                btnOut.style.display = "flex";
                cartBtn.style.display = "flex";
            }
            else{
                cartBtn.style.display = "none";
            }
    });
    
    // открытие модалки
    btnAuth.addEventListener("click", () => {
        modal.style.display = "flex";
    });
    
    // закрытие при нажатии на крестик
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    })
    
    // закрытие при нажатии вне окна
    modal.addEventListener("click", (e) => {
        const isModal = e.target.closest(".modal-dialog-auth");
    
        if (!isModal){
            modal.style.display = "none";
        }
    })
    
    // авторизация
    modal.addEventListener("submit", (e) => {
        e.preventDefault();
    
        let log = modal.querySelector("#login").value;
        let pass = modal.querySelector("#password").value;
    
        if (log == "" && pass == ""){
            return alert("Заполните все поля");
        }
        else if (log == ""){
            return alert("Поле логин не должно быть пустым");
        }
        else if (pass == ""){
            return alert("Поле пароль не должно быть пустым");
        }
    
        for (elem of accounts){
            if (elem.login == log && elem.password == pass){
                username.style.display = "flex";
                username.innerHTML = log;
                btnAuth.style.display = "none";
                btnOut.style.display = "flex";
                localStorage.setItem("user", JSON.stringify(log));
                cartBtn.style.display = "flex";
                return modal.style.display = "none";
            }
        }
    
        alert("Неправильный логин или пароль");
    });
    
    
    
    // выход из аккаунта
    btnOut.addEventListener("click", () => {
        username.style.display = "none";
        btnOut.style.display = "none";
        btnAuth.style.display = "flex";
        localStorage.setItem("user", JSON.stringify(null));
        cartBtn.style.display = "none";
    });
}

auth();