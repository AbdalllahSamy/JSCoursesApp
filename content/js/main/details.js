const id = new URLSearchParams(window.location.search).get('id');
const userID = new URLSearchParams(window.location.search).get('userID');




const details = document.querySelector('.details-content');

async function fetchCourse() {
    const res = await fetch('http://localhost:3000/courses/' + id);
    const data = await res.json();
    if (userID == 1) {
        addCourseToThePage(data);
    } else if(data.avaliableSeats > 0) {
        addCourseToThePage(data);
    } else{
        document.querySelector('.course-full').style.display = "flex";
    }
}

function addCourseToThePage(data) {
    details.innerHTML = `
    <div class="secondary-header">
        <div class="container">
            <div class="secondary-header__content text-center">
                <h2 class="secondary-header__head text-capitalize">${data.name}
                    Course Details</h2>
                <p class="secondary-header__title">${data.description}</p>
            </div>
        </div>
    </div>

<div class="index-sections details-section">
    <div class="container">
        <div class="row details-content">
            <div class="w-70">
                <img
                    src="../content/assets/images/index/course-details.jpg"
                    alt="course-photo">
            </div>
            <div class="w-30">
                <ul class="details-content__list">
                    <li class="details-content__element">
                        <p class="details-content__title">Trainer</p>
                        <h4 class="details-content__answer">${data.trainer}</h4>
                    </li>
                    <li class="details-content__element">
                        <p class="details-content__title">Course Fee</p>
                        <h4 class="details-content__answer">${data.price}</h4>
                    </li>
                    <li class="details-content__element">
                        <p class="details-content__title">Available
                            Seats</p>
                        <h4 class="details-content__answer">${data.avaliableSeats}</h4>
                    </li>
                    <li class="details-content__element">
                        <p class="details-content__title">Schedule</p>
                        <h4 class="details-content__answer">${data.schedule}</h4>
                    </li>
                </ul>
                    <div class="enroll text-center">
                        <button class="button-enroll text-uppercase">Enroll</button>
                        <a href="courses.html"><button class="button-back text-uppercase">Back</button></a>
                    </div>
                </div>
            </div>
            <div class="course-identification">
                <h2 class="course-name text-capitalize">${data.name}</h2>
                <span class="course-line"></span>
                <p class="course-description">${data.description}</p>
            </div>
        </div>
    </div>
    `

    const enroll = document.querySelector('.button-enroll');
    if (userID == 1) {
        enroll.style.display = "none";
    } else {

        enroll.addEventListener('click', function (e) {
            const id = data.id;
            const newData = {
                id: data.id,
                name: data.name,
                coursePhoto: data.coursePhoto,
                trainer: data.trainer,
                trainerPhoto: data.trainerPhoto,
                price: data.price,
                lovers: data.lovers,
                likes: data.likes,
                avaliableSeats: data.avaliableSeats - 1,
                schedule: data.schedule,
                enrolled: data.enrolled + 1,
                description: data.description
            };
            if (data.avaliableSeats) {
                fetch('http://localhost:3000/courses/' + id, {
                    method: 'PUT',
                    body: JSON.stringify(newData),
                    headers: { 'Content-Type': 'application/json' }
                }).then(() => {
                    window.location.href = "http://127.0.0.1:5500/views/courses.html";
                })
            }
        })
    }
}

fetchCourse();
