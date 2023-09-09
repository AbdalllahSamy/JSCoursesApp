const id = new URLSearchParams(window.location.search).get('id');


const trainers = document.querySelector('.courses-cards');

let navElement = document.querySelector('.nav-list__about');
let navLogin = document.querySelector('.nav-list__login');
let navcontact = document.querySelector('.nav-list__contact');
let navcourses = document.querySelector('.nav-list__courses');
let navevents = document.querySelector('.nav-list__trainers');
let navtrainers = document.querySelector('.nav-list__events');
let navIndex = document.querySelector('.nav-list__index');
let user = document.querySelector('.user-name');
let headerTitle = document.querySelector('.index-hero__header');

const addTrainerBtn = document.querySelector('.add');
if (id == 1) {
    addTrainerBtn.style.display="block";
}

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
        class="nav-list__link text-capitalize" style="color: #5fcf80;">trainers</a>`
        navevents.innerHTML=`<a
        href="events.html?id=1"
        class="nav-list__link text-capitalize">events</a>`
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
        window.location.href = "trianers.html?id=" + localStorage.getItem('id');
    }
    navElement.innerHTML = `<a
    href="about.html"
    class="nav-list__link text-capitalize nav-list__about">about</a></li>
    `;
    navLogin.innerHTML = `<a href="login.html"
    class="text-capitalize btn-started text-white">login</a>`
}


async function fetchTrainers() {
    const res = await fetch('http://localhost:3000/trainers');
    const data = await res.json();
    if (res.ok) {
        document.querySelector('.loading').style.display="none";
        document.querySelector('.main-index').style.display="block";
    }
    addTrainerToThePage(data);
}

function addTrainerToThePage(data) {
    data.forEach(element => {
        trainers.innerHTML += `
        <div class="w-33">
                        <div class="trainer-card animate__fadeInUp animate__animated">
                            <figure>
                                <img
                                    src="../content/assets/images/index/trainers/${element.trainerPhoto}"
                                    alt="trainer-photo">
                            </figure>
                            <div class="trainer-details text-center">
                                <h3 class="text-capitalize trainer-details__name">${element.name}</h3>
                                <h5 class="text-capitalize trainer-details__work">${element.work}</h5>
                                <p class="trainer-details__text">${element.description}</p>
                                <div class="text-center trainer-social">
                                    <a href="#" class="social-links"><i class="fa-brands fa-facebook-f"></i></a>
                                    <a href="#" class="social-links"><i class="fa-brands fa-twitter"></i></a>
                                    <a href="#" class="social-links"><i class="fa-brands fa-linkedin-in"></i></a>
                                    <a href="#" class="social-links"><i class="fa-brands fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    });
}

fetchTrainers();


