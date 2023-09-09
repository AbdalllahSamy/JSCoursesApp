const contactForm = document.querySelector('.contact-form');

let nameCourse = document.querySelector('.input-name');
let PhotoCourse = document.querySelector('.input-CoursePhoto');

let TrainerCourse = document.querySelector('.input-trainerName');
let PhotoTrainer = document.querySelector('.input-TrainerPhoto');

let priceCourse = document.querySelector('.input-price');
let scheduleCourse = document.querySelector('.input-schedule');
let descriptionCourse = document.querySelector('.input-description');

const fail = document.querySelector('.failed');
const succes = document.querySelector('.succes');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameValue = nameCourse.value;
    const PhotoCourseValue = PhotoCourse.value;
    const TrainerValue = TrainerCourse.value;
    const PhotoTrainerValue = PhotoTrainer.value;
    const priceCourseValue = priceCourse.value;
    const scheduleCourseValue = scheduleCourse.value;
    const descriptionCourseValue = descriptionCourse.value;
    document.querySelector('.loading-login').style.display = "flex";
    document.querySelector('.main-index__login').style.display = "none";
    if (nameValue && PhotoCourseValue && TrainerValue && PhotoTrainerValue && priceCourseValue && scheduleCourseValue && descriptionCourseValue) {
        const url = 'http://localhost:3000/courses';
        const data = {
            name: nameValue,
            coursePhoto: PhotoCourseValue,
            trainer: TrainerValue,
            trainerPhoto: PhotoTrainerValue,
            price: priceCourseValue,
            lovers: 0,
            likes: 0,
            avaliableSeats: 30,
            schedule: scheduleCourseValue,
            enrolled: 0,
            description: descriptionCourseValue
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
                    succes.style.display = "block";
                    setTimeout(() => {
                        succes.style.display = "none";
                    }, 3000);
                } else {
                    console.log('Error submitting contact form');
                }
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        fail.style.display = "block";
        setTimeout(() => {
            fail.style.display = "none";
        }, 3000);
    }
});