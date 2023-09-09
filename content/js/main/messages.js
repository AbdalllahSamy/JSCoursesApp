const id = new URLSearchParams(window.location.search).get('id');
fetchMessages();


let navElement = document.querySelector('.nav-list__about');
let navLogin = document.querySelector('.nav-list__login');
let navPricing = document.querySelector('.nav-list__pricing');
let navcontact = document.querySelector('.nav-list__contact');
let navcourses = document.querySelector('.nav-list__courses');
let navevents = document.querySelector('.nav-list__trainers');
let navtrainers = document.querySelector('.nav-list__events');
let navIndex = document.querySelector('.nav-list__index');
let user = document.querySelector('.user-name');
let headerTitle = document.querySelector('.index-hero__header');

if (id) {
    if (id == 1) {
        if (!localStorage.getItem("username")) {
            window.location.href = "courses.html";
        } else if (localStorage.getItem("id") === id) {
            navIndex.innerHTML = `<a href="../index.html?id=1"
            class="nav-list__link text-capitalize"
            >home</a>`;
            navElement.innerHTML = `<a
        href="messages.html?id=1"
        class="nav-list__link text-capitalize nav-list__about" style="color: #5fcf80;">message</a></li>
        `;
            navLogin.innerHTML = `<buttom
        class="text-capitalize btn-started text-white btn-logout"  style="cursor: pointer;">logout</buttom>`
        navcourses.innerHTML = `<a
        href="courses.html?id=1"
        class="nav-list__link text-capitalize">courses</a>`
        navtrainers.innerHTML = `<a
        href="trianers.html?id=1"
        class="nav-list__link text-capitalize">trainers</a>`
        navevents.innerHTML=`<a
        href="events.html?id=1"
        class="nav-list__link text-capitalize">events</a>`
            navPricing.style.display = "none";
            navcontact.style.display = "none";
            let btnLogout = document.querySelector('.btn-logout');
            btnLogout.addEventListener('click', function () {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("type");
                localStorage.removeItem("id");
                window.location.href = "http://127.0.0.1:5500/index.html"
            })
        }
        else if (localStorage.getItem("id") !== id) {
            window.location.href = "courses.html?id=" + localStorage.getItem('id');
        }
    } else {
        if (!localStorage.getItem("username")) {
            window.location.href = "courses.html";
        } else if (localStorage.getItem("id") !== id) {
            window.location.href = "../index.html?id=" + localStorage.getItem('id');
        } else {
            navElement.innerHTML = `<a
        href="views/about.html"
        class="nav-list__link text-capitalize nav-list__about">about</a></li>
        `;
            navLogin.innerHTML = `<buttom
        class="text-capitalize btn-started text-white btn-logout"  style="cursor: pointer;">logout</buttom>`
            navPricing.style.display = "none";
            // navcontact.style.display = "none";
            let btnLogout = document.querySelector('.btn-logout');
            btnLogout.addEventListener('click', function () {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("type");
                localStorage.removeItem("id");
                window.location.href = "http://127.0.0.1:5500/courses.html"
            })
        }
    }
} else {
    if (localStorage.getItem("username")) {
        window.location.href = "courses.html?id=" + localStorage.getItem('id');
    }
    navElement.innerHTML = `<a
    href="views/about.html"
    class="nav-list__link text-capitalize nav-list__about">about</a></li>
    `;
    navLogin.innerHTML = `<a href="login.html"
    class="text-capitalize btn-started text-white">login</a>`
}

let tableData = document.querySelector('.messages-section__table');

async function fetchMessages(){
    let res = await fetch('http://localhost:3000/contact');
    let data = await res.json();
    showMessagesInScreen(data);
}

function showMessagesInScreen(data){
    data.forEach(element => {
        tableData.innerHTML += `
            <tr class="messages-section__row">
                        <td class="messages-section__element">${element.first_name}</td>
                        <td class="messages-section__element">${element.last_name}</td>
                        <td class="messages-section__element">${element.subject}</td>
                        <td class="messages-section__element">${element.message} Ok</td>
                    </tr>
        `
    });
}