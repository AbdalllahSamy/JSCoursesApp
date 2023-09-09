let btn = document.querySelector('.login-card__button');
let email = document.querySelector('.login-card__input');
let password = document.querySelector('.login-card__password');
let fail = document.querySelector('.failed');
let flag = 0;



async function getUsers() {
    let res = await fetch('http://localhost:3000/users');
    let data = await res.json();
    chechUser(data);
}

function chechUser(data) {
    let emailInput = email.value;
    let passwordInput = password.value;
    data.forEach(element => {
        if (emailInput === element.email && passwordInput === element.password && element.type === "admin") {
            flag = 1;
            localStorage.setItem("username", element.email);
            localStorage.setItem("type", element.type);
            localStorage.setItem("password", element.password);
            localStorage.setItem("id", element.id);
            localStorage.setItem("name", element.name);
            window.location.href = "http://127.0.0.1:5500/index.html?id=" + element.id;
        } else if (emailInput === element.email && passwordInput === element.password && element.type === "user") {
            flag = 2;
            localStorage.setItem("username", element.email);
            localStorage.setItem("type", element.type);
            localStorage.setItem("password", element.password);
            localStorage.setItem("id", element.id);
            localStorage.setItem("name", element.name);
            window.location.href = "http://127.0.0.1:5500/index.html?id=" + element.id;
        }
    });
    if (flag === 0) {
        document.querySelector('.loading-login').style.display="none";
        document.querySelector('.main-index__login').style.display="block";
        fail.style.display = 'block';
    }
}

btn.addEventListener('click', function () {
    document.querySelector('.loading-login').style.display="flex";
    document.querySelector('.main-index__login').style.display="none";
    getUsers();
})

function disallowBackButton() {
    window.history.forward();
}