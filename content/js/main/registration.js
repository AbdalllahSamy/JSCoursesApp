let name = document.querySelector('.login-card__name');
let userName = document.querySelector('.login-card__email');
let password = document.querySelector('.login-card__password');
let btn = document.querySelector('.login-card__button');
let fail = document.querySelector('.failed');
let typeData = "user";

// console.log(btn,name,userName,password);

btn.addEventListener('click', function(){
    // e.preventDefault();
    const nameValue = name.value;
    const userNameValue = userName.value;
    const passwordValue = password.value;
    if (nameValue && userNameValue && passwordValue) {
        const url = 'http://localhost:3000/users';
        const data = {
            name: nameValue,
            email: userNameValue,
            password: passwordValue,
            type: typeData
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
                    // contactForm.reset();
                    window.location.href = "/views/login.html";
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
})