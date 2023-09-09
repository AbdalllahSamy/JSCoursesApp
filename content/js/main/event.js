const id = new URLSearchParams(window.location.search).get('id');

const addCoursesBtn = document.querySelector('.add');
if (id == 1) {
    addCoursesBtn.style.display = "block";
}

let navElement = document.querySelector('.nav-list__about');
let navLogin = document.querySelector('.nav-list__login');
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
        class="nav-list__link text-capitalize nav-list__about">message</a></li>
        `;
            navLogin.innerHTML = `<buttom
        class="text-capitalize btn-started text-white btn-logout"  style="cursor: pointer;">logout</buttom>`
            navcourses.innerHTML = `<a
        href="courses.html?id=1"
        class="nav-list__link text-capitalize">courses</a>`
            navtrainers.innerHTML = `<a
        href="trianers.html?id=1"
        class="nav-list__link text-capitalize">trainers</a>`
            navevents.innerHTML = `<a
        href="events.html?id=1"
        class="nav-list__link text-capitalize" style="color: #5fcf80;">events</a>`
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
            window.location.href = "../index.html";
        } else if (localStorage.getItem("id") !== id) {
            window.location.href = "../index.html?id=" + localStorage.getItem('id');
        } else {
            navElement.innerHTML = `<a
        href="about.html?id=${localStorage.getItem('id')}"
        class="nav-list__link text-capitalize nav-list__about">about</a></li>
        `;
        navcontact.innerHTML = `<a
        href="contact.html?id=${localStorage.getItem('id')}"
        class="nav-list__link text-capitalize nav-list__about">contact</a></li>
        `;
            navLogin.innerHTML = `<buttom
        class="text-capitalize btn-started text-white btn-logout"  style="cursor: pointer;">logout</buttom>`
            // navcontact.style.display = "none";
            let btnLogout = document.querySelector('.btn-logout');
            btnLogout.addEventListener('click', function () {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("type");
                localStorage.removeItem("id");
                window.location.href = "http://127.0.0.1:5500/index.html"
            })
        }
    }
} else {
    if (localStorage.getItem("username")) {
        window.location.href = "events.html?id=" + localStorage.getItem('id');
    }
    navElement.innerHTML = `<a
    href="about.html"
    class="nav-list__link text-capitalize nav-list__about">about</a></li>
    `;
    navLogin.innerHTML = `<a href="login.html"
    class="text-capitalize btn-started text-white">login</a>`
}

let eventes = document.querySelector('.event-data');

async function fetchEvents() {
    const res = await fetch('http://localhost:3000/events');
    const data = await res.json();
    if (res.ok) {
        document.querySelector('.loading').style.display = "none";
        document.querySelector('.main-index').style.display = "block";
    }
    addEventsToThePage(data);
}

function addEventsToThePage(data) {
    data.forEach(element => {
        eventes.innerHTML += `
        <div class="w-50 event-item">
                        <div class="event-content">
                            <img src="../content/assets/images/index/${element.photoEvent}" alt="" class="event-img">
                            <div class="event-title">
                                <div class="text-center event-title__head">
                                    <h3 class="event-title__header text-capitalize">${element.name}</h3>
                                    <h5 class="event-title__date">${element.time}</h5>
                                </div>
                                <p class="event-title__description">${element.description}</p>
                            </div>
                        </div>
                    </div>
        `
    });
}

fetchEvents();

