// import { signup_endpoint_post } from "../Common_files/endpoint.js";

function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}


let login_signup_close = document.getElementById('close_this_section_id');
login_signup_close.addEventListener('click', () => {
    let animation_item = document.getElementById('login_signup_option_id');
    animation_item.style.animationName = `login_appear_reverse`;
    animation_item.style.animationDelay = `0s`;
});



document.getElementById('login_signup_option_open').addEventListener('click', () => {
    let animation_item = document.getElementById('login_signup_option_id');
    animation_item.style.animationName = `login_appear`;
    animation_item.style.animationDelay = `0s`;
});



const crypto = require('crypto');

function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

function handleSignupFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    let password = document.getElementById('signup-password').value;
    let confirmPassword = document.getElementById('signup-confirm-password').value;
    const email = document.getElementById('signup-email').value;
    const contactNumber = document.getElementById('signup-contact-number').value;
    const countryCode = document.getElementById('signup-country-code').value;
    const address = document.getElementById('signup-address').value;
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }
    const hash_password = hashPassword(password) ;
    const signupData = {
        username: username,
        password: hash_password,
        email: email,
        contactNumber: contactNumber,
        countryCode: countryCode,
        address: address
    };
    fetch(signup_endpoint_post, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Signup Success:', data);
            alert('Signup successful!');
        })
        .catch((error) => {
            console.error('Signup Error:', error);
            alert('Signup failed!');
        });
}

function handleLoginFormSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginData = {
        email: email,
        password: password
    };
    fetch('https://your-endpoint-url.com/X', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Login Success:', data);
            alert('Login successful!');
        })
        .catch((error) => {
            console.error('Login Error:', error);
            alert('Login failed!');
        });
}


document.getElementById('signup-form').addEventListener('submit', handleSignupFormSubmit);
document.getElementById('login-form').addEventListener('submit', handleLoginFormSubmit);

// document.getElementById('login_signup_swap').addEventListener('click' , toggleForm());
















document.querySelector('.custom-multi-select').addEventListener('click', function () {
    this.classList.toggle('open');
});

document.querySelectorAll('.custom-multi-select select option').forEach(option => {
    option.addEventListener('click', function (e) {
        console.log("Clicked");
        e.stopPropagation();
    });
});





















document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-images img');
    const imagesPerSlide = 4;
    const totalImages = images.length;
    const carouselImages = document.getElementById('carousel-images');

    function moveCarousel(direction) {
        currentIndex += direction * imagesPerSlide;

        if (currentIndex < 0) {
            currentIndex = totalImages - imagesPerSlide;  // Move to last set of images
        } else if (currentIndex >= totalImages) {
            currentIndex = 0;  // Reset to the first set of images
        }

        carouselImages.style.transform = `translateX(-${(100 / imagesPerSlide) * currentIndex}%)`;
    }

    // Expose moveCarousel function to global scope so it can be used in HTML
    window.moveCarousel = moveCarousel;
});



let carousel_left_click = document.getElementById('carousel_left_click');
console.log(carousel_left_click);
let carousel_right_click = document.getElementById('carousel_right_click');
console.log(carousel_right_click);

carousel_left_click.addEventListener('click', () => {
    console.log("one");
    moveCarousel(-1);
})
carousel_right_click.addEventListener('click', () => {
    console.log("two");
    moveCarousel(1);
})