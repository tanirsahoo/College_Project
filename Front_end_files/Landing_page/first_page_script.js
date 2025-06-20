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


// console.log(document.getElementById('login_signup_option_open'));
document.querySelectorAll('.login_signup_option_open').forEach(div => {
    div.addEventListener('click', () => {
        // Select the animation target by its ID
        let animation_item = document.getElementById('login_signup_option_id');

        if (animation_item) {
            animation_item.style.animationName = `login_appear`;
            animation_item.style.animationDelay = `0s`;
        } else {
            console.error("Target element #login_signup_option_id not found!");
        }
    });
});





async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}



function handleSignupFormSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('signup-email').value;
    const contactNumber = document.getElementById('contact-number').value;

// if (contactNumber) {
//     contactNumber.addEventListener('input', function () {
//         // Your code here
//     });
// } else {
//     console.log("Element 'contact-number' not found");
// }
    const countryCode = document.getElementById('country-code').value;
    const address = document.getElementById('signup-address').value;
    const referral = document.getElementById('signup-referral').value;

    // Check for matching passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Check if hashPassword function exists
    // if (typeof hashPassword !== 'function') {
    //     console.error('hashPassword function is not defined');
    //     alert('Error processing password. Please try again later.');
    //     return;
    // }

    // const hash_password = await hashPassword(password);
    // console.log(hash_password) ;
    // console.log(typeof hash_password[2]) ;

    // let hashpassword = "" ;

    // hashPassword(password).then(hash_password => {
    //     hashpassword = hash_password ;
    //     console.log(hash_password);  // Logs the hashed password as a string.
    // });

    // const hashedpassword = hashpassword ;


    const final_contact = `${countryCode}${contactNumber}`; // final_contact = +919865163156

    const signupData = { //JSON Data
        username: username,
        email: email,
        password: password,
        address: address,
        referral_id: referral,
        contact_number: final_contact
    };

    // console.log(signupData);

    // Ensure the endpoint is defined and valid
    if (!signup_endpoint_post) {
        // console.error('Signup endpoint is not defined');
        alert('Error submitting form. Please try again later.');
        return;
    }

    fetch(signup_endpoint_post, { // fetch('http://localhost:9000/user/' , {})
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
        .then(response => {
            if (!response.ok) throw new Error('Invalid Referral ID');
            return response.json();
        })
        .then(data => {
            alert('Please verify your Email');
        })
        .catch((error) => {
            // console.error('Signup Error:', error);
            alert(error.message || 'An error occurred during signup.');
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

    fetch(login_endpoint_post, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // if (data === true) {
        //     console.log('Login Success:', data);
        //     alert('Login successful!');
        //     setCookie("Email-Address", email , 30); // Set cookie for 30 days
        //     window.location.href = index_page ;
        // } else {
        //     console.log('Login Failed:', data);
        //     alert('Invalid email or password. Please try again.');
        // }

        if (data === true) {
            console.log('Login Success:', data);
            alert('Login successful!');
            setCookie("Email-Address", email , 30); // Set cookie for 30 days
        
            // Wait 100ms before redirecting
            setTimeout(() => {
                window.location.href = index_page;
            }, 100);
        }
    })
    .catch(error => {
        console.error('Login Error:', error);
        alert('An error occurred during login. Please try again later.');
    });
}



let signUp_form = document.getElementById('signup-form') ;
// console.log(signUp_form);
signUp_form.addEventListener('submit', handleSignupFormSubmit);

document.getElementById('login-form').addEventListener('submit', handleLoginFormSubmit);














// document.querySelector('.custom-multi-select').addEventListener('click', function () {
//     this.classList.toggle('open');
// });

// document.querySelectorAll('.custom-multi-select select option').forEach(option => {
//     option.addEventListener('click', function (e) {
//         console.log("Clicked");
//         e.stopPropagation();
//     });
// });





















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



// let carousel_left_click = document.getElementById('carousel_left_click');
// console.log(carousel_left_click);
// let carousel_right_click = document.getElementById('carousel_right_click');
// console.log(carousel_right_click);

// carousel_left_click.addEventListener('click', () => {
//     console.log("one");
//     moveCarousel(-1);
// })
// carousel_right_click.addEventListener('click', () => {
//     console.log("two");
//     moveCarousel(1);
// })

















// console.log("Happy World");

//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

console.log(nextDom) ;
console.log(prevDom) ;
console.log(carouselDom) ;
console.log(SliderDom) ;
console.log(thumbnailBorderDom) ;
console.log(thumbnailItemsDom) ;
console.log(timeDom) ;


thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}