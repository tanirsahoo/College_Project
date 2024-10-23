function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}


let login_signup_close = document.getElementById('close_this_section_id') ;
login_signup_close.addEventListener('click' , () =>{
    let animation_item = document.getElementById('login_signup_option_id') ;
    animation_item.style.animationName = `login_appear_reverse` ;
    animation_item.style.animationDelay = `0s` ;
}) ;



document.getElementById('login_signup_option_open').addEventListener('click' , () =>{
    let animation_item = document.getElementById('login_signup_option_id') ;
    animation_item.style.animationName = `login_appear` ;
    animation_item.style.animationDelay = `0s` ;
}) ;





function handleSignupFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const email = document.getElementById('signup-email').value;
    const contactNumber = document.getElementById('signup-contact-number').value;
    const countryCode = document.getElementById('signup-country-code').value;
    const address = document.getElementById('signup-address').value;
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }
    const signupData = {
        username: username,
        password: password,
        email: email,
        contactNumber: contactNumber,
        countryCode: countryCode,
        address: address
    };
    fetch('https://your-endpoint-url.com/X', {
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
















document.querySelector('.custom-multi-select').addEventListener('click', function() {
    this.classList.toggle('open');
});

document.querySelectorAll('.custom-multi-select select option').forEach(option => {
    option.addEventListener('click', function(e) {
        console.log("Clicked");
        e.stopPropagation();
    });
});
