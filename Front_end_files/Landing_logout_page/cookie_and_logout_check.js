// Function to get a cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    console.log(cookies);
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

// Function to set a cookie
function setCookie(name, value, daysToExpire = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}


// Function to delete a cookie (expire it)
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}


// Check if "user_session" cookie exists


// Add event listener for logout button
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout_link");
    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            // Delete the session cookie
            deleteCookie("Email-Address");

            // Redirect to first_page.html
            window.location.href = "http://127.0.0.1:5500/Landing_page/first_page.html";
        });
    }
});

// deleteCookie("user_session") ;