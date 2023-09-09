const contactForm = document.querySelector('.contact-form');
const firstName = document.querySelector('.input-firstName');
const lastName = document.querySelector('.input-lastName');
const subject = document.querySelector('.input-subject');
const message = document.querySelector('.input-message');
const fail = document.querySelector('.failed');
const succes = document.querySelector('.succes');

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
        class="nav-list__link text-capitalize">trainers</a>`
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
        class="nav-list__link text-capitalize nav-list__about"  style="color: #5fcf80;">contact</a></li>
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
        window.location.href = "contact.html?id=" + localStorage.getItem('id');
    }
    navElement.innerHTML = `<a
    href="about.html"
    class="nav-list__link text-capitalize nav-list__about">about</a></li>
    `;
    navLogin.innerHTML = `<a href="login.html"
    class="text-capitalize btn-started text-white">login</a>`
}



contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstValue = firstName.value;
    const lastValue = lastName.value;
    const subjectValue = subject.value;
    const messageValue = message.value;
    document.querySelector('.loading-login').style.display = "flex";
    document.querySelector('.main-index__login').style.display = "none";
    if (firstValue && lastValue && subjectValue && messageValue) {
        const url = 'http://localhost:3000/contact';
        const data = {
            first_name: firstValue,
            last_name: lastValue,
            subject: subjectValue,
            message: messageValue
        };
    
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 201) {
                    window.stop();
                    document.querySelector('.loading-login').style.display = "none";
                    document.querySelector('.main-index__login').style.display = "block";
                    contactForm.reset();
                    succes.style.display= "block";
                    setTimeout(() => {
                        succes.style.display= "none";
                    }, 3000);
                } else {
                    console.log('Error submitting contact form');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }else{
        fail.style.display= "block";
        setTimeout(() => {
            fail.style.display= "none";
        }, 3000);
    }
});