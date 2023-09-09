const id = new URLSearchParams(window.location.search).get('id');
let navElement = document.querySelector('.nav-list__about');
let navLogin = document.querySelector('.nav-list__login');
let navcontact = document.querySelector('.nav-list__contact');
let navcourses = document.querySelector('.nav-list__courses');
let navevents = document.querySelector('.nav-list__trainers');
let navtrainers = document.querySelector('.nav-list__events');
let user = document.querySelector('.user-name');
let headerTitle = document.querySelector('.index-hero__header');

if (id) {
    if (id == 1) {
        if (!localStorage.getItem("username")) {
            window.location.href = "index.html";
        } else if (localStorage.getItem("id") === id) {
            navElement.innerHTML = `<a
        href="views/messages.html?id=1"
        class="nav-list__link text-capitalize nav-list__about">message</a></li>
        `;
            navLogin.innerHTML = `<buttom
        class="text-capitalize btn-started text-white btn-logout"  style="cursor: pointer;">logout</buttom>`
        navcourses.innerHTML = `<a
        href="views/courses.html?id=1"
        class="nav-list__link text-capitalize">courses</a>`
        navtrainers.innerHTML = `<a
        href="views/trianers.html?id=1"
        class="nav-list__link text-capitalize ">trainers</a>`
        navevents.innerHTML=`<a
        href="views/events.html?id=1"
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
            window.location.href = "index.html?id=" + localStorage.getItem('id');
        }
    } else {
        if (!localStorage.getItem("username")) {
            window.location.href = "index.html";
        } else if (localStorage.getItem("id") !== id) {
            window.location.href = "index.html?id=" + localStorage.getItem('id');
        } else {
            navElement.innerHTML = `<a
        href="views/about.html"
        class="nav-list__link text-capitalize nav-list__about">about</a></li>
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
        window.location.href = "index.html?id=" + localStorage.getItem('id');
    }
    navElement.innerHTML = `<a
    href="views/about.html"
    class="nav-list__link text-capitalize nav-list__about">about</a></li>
    `;
    navLogin.innerHTML = `<a href="views/login.html"
    class="text-capitalize btn-started text-white">login</a>`
}

if (localStorage.getItem("name")) {
    user.innerHTML = `Hello ${localStorage.getItem("name")}`
}


let aboutLeft = document.querySelector(".about-left");
let aboutRight = document.querySelector(".about-right");
let chooseLeft = document.querySelector(".choose-left");
let chooseRight = document.querySelector(".choose-right");
let coursesHeader = document.querySelector(".courses-section__header");
let coursescontent = document.querySelector(".courses-cards");
let trainerHeader = document.querySelector(".trainers-section__header");
let trainercontent = document.querySelector(".trainers-cards");
let categorySection = document.querySelector(".category-section");
let started = false;


window.onscroll = function () { scrollsIndex() };

function scrollsIndex() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop < 500) {
        aboutLeft.classList.add('animate__animated', 'animate__fadeInUp');
        aboutRight.classList.add('animate__animated', 'animate__fadeInBottomRight');
        aboutLeft.style.visibility = "visible";
        aboutRight.style.visibility = "visible";
    }
    else if (document.body.scrollTop > 880 || document.documentElement.scrollTop < 900) {
        chooseLeft.classList.add('animate__animated', 'animate__fadeInUp');
        chooseRight.classList.add('animate__animated', 'animate__zoomIn');
        chooseLeft.style.visibility = "visible";
        chooseRight.style.visibility = "visible";
    }
    else if (document.body.scrollTop > 1248 || document.documentElement.scrollTop < 1600) {
        categorySection.classList.add('animate__animated', 'animate__zoomIn');
        categorySection.style.visibility = "visible";
    }
    else if (document.body.scrollTop > 1800 || document.documentElement.scrollTop < 2112) {
        coursesHeader.classList.add('animate__animated', 'animate__fadeInUp');
        coursescontent.classList.add('animate__animated', 'animate__zoomIn');
        coursesHeader.style.visibility = "visible";
        coursescontent.style.visibility = "visible";
    }
    else if (document.body.scrollTop > 2288 || document.documentElement.scrollTop < 2816) {
        trainerHeader.classList.add('animate__animated', 'animate__fadeInUp');
        trainercontent.classList.add('animate__animated', 'animate__zoomIn');
        trainerHeader.style.visibility = "visible";
        trainercontent.style.visibility = "visible";
    }
    let nums = document.querySelectorAll(".summrise-content__number");

    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 900) {
        if (!started) {
            nums.forEach(num => startCount(num));
        }
        started = true;
    }
}



async function fetchAll() {
    const trainersRes = await fetch('http://localhost:3000/trainers');
    const trainersData = await trainersRes.json();
    const coursesRes = await fetch('http://localhost:3000/courses?_sort=likes&_order=desc');
    const coursesData = await coursesRes.json();
    const eventsRes = await fetch('http://localhost:3000/events');
    const eventsData = await eventsRes.json();
    const usersRes = await fetch('http://localhost:3000/users');
    const usersData = await usersRes.json();
    if (trainersRes.ok) {
        document.querySelector('.loading').style.display="none";
        document.querySelector('.main-index').style.display="block";
    }
    showNumbersDetails(trainersData.length, coursesData.length, eventsData.length, usersData.length);
    displayData(coursesData);
}

function showNumbersDetails(trainersData, coursesData, eventsData, usersData) {
    let sumPeople = document.querySelector('.summrise-students');
    let sumCourses = document.querySelector('.summrise-courses');
    let sumEvents = document.querySelector('.summrise-events');
    let sumTrainers = document.querySelector('.summrise-trainers');
    sumPeople.setAttribute("data-goal", usersData -1 );
    sumCourses.setAttribute("data-goal", coursesData);
    sumEvents.setAttribute("data-goal", eventsData);
    sumTrainers.setAttribute("data-goal", trainersData);
}
fetchAll();

function startCount(el) {
    let goal = el.dataset.goal;
    let count = setInterval(() => {
        el.textContent++;
        if (el.textContent == goal) {
            clearInterval(count);
        }
    }, 2000 / goal);
}

function displayData(data) {
    for (let i = 0; i < 3; i++) {
        coursescontent.innerHTML += `
        <div class="w-33">
        <div class="course-card">
            <figure>
                <img
                    src="content/assets/images/index/${data[i].coursePhoto}"
                    alt="course-photo">
            </figure>
            <div class="course-all">
                <div class="course-details">
                    <h4
                        class="text-capitalize course-details__name">${data[i].name}</h4>
                    <p class="course-details__price">$250</p>
                </div>
                <div class="course-title">
                    <a href="#"
                        class="text-capitalize course-title__header">${data[i].name}</a>
                    <p class="course-title__text">${data[i].description}</p>
                </div>
                <div class="course-monitor">
                    <div class="monitor-photo">
                        <img
                            src="content/assets/images/index/trainers/${data[i].trainerPhoto}"
                            alt class="monitor-photo__img">
                        <span
                            class="text-capitalize course-monitor__name text-gray">${data[i].trainer}</span>
                    </div>
                    <div class="course-react">
                        <span
                            class="course-react__lover text-gray"><i
                                class="fa-regular fa-heart"></i>
                            ${data[i].likes}</span>
                        <span
                            class="course-react__people text-gray"><i
                                class="fa-regular fa-user"></i>
                            ${data[i].lovers}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    }
}
