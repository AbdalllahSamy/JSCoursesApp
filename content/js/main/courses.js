const id = new URLSearchParams(window.location.search).get('id');

const courses = document.querySelector('#Available-courses');
const addCoursesBtn = document.querySelector('.add');
if (id == 1) {
    addCoursesBtn.style.display="block";
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
        class="nav-list__link text-capitalize" style="color: #5fcf80;">courses</a>`
        navtrainers.innerHTML = `<a
        href="trianers.html?id=1"
        class="nav-list__link text-capitalize ">trainers</a>`
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
        window.location.href = "courses.html?id=" + localStorage.getItem('id');
    }
    navElement.innerHTML = `<a
    href="about.html"
    class="nav-list__link text-capitalize nav-list__about">about</a></li>
    `;
    navLogin.innerHTML = `<a href="login.html"
    class="text-capitalize btn-started text-white">login</a>`
}




async function fetchCourses() {
    const res = await fetch('http://localhost:3000/courses');
    const data = await res.json();
    if (res.ok) {
        document.querySelector('.loading').style.display="none";
        document.querySelector('.main-index').style.display="block";
    }
    addCoursesToThePage(data);
}

function addCoursesToThePage(data) {
    data.forEach(element => {
        courses.innerHTML += `
        <div class="w-33">
        <div class="course-card animate__fadeInUp animate__animated">
            <figure>
                <img
                    src="../content/assets/images/index/${element.coursePhoto}"
                    alt="course-photo">
            </figure>
            <div class="course-all">
                <div class="course-details">
                    <h4
                        class="text-capitalize course-details__name">${element.name}</h4>
                    <p class="course-details__price">${element.price}</p>
                </div>
                <div class="course-title">
                    <a href="/views/details.html?id=${element.id}&userID=${localStorage.getItem('id')}"
                        class="text-capitalize course-title__header">${element.name}</a>
                    <p class="course-title__text">${element.description}</p>
                    <p class="course-title__text course-fulls">Avaliable Seats: ${element.avaliableSeats}</p>
                </div>
                <div class="course-monitor">
                    <div class="monitor-photo">
                        <img
                            src="../content/assets/images/index/trainers/${element.trainerPhoto}"
                            alt class="monitor-photo__img">
                        <span
                            class="text-capitalize course-monitor__name text-gray">${element.trainer}</span>
                    </div>
                    <div class="course-react">
                        <span
                            class="course-react__lover text-gray"><i class="fa-regular fa-heart"></i> ${element.lovers}</span>
                        <span
                            class="course-react__people text-gray"><i class="fa-regular fa-user"></i> ${element.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    });
}

fetchCourses();

let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum = sum + i;
}
console.log(sum);