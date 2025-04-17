// Function to get a cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

// Function to set a cookie
// function setCookie(name, value, daysToExpire = 7, path = "/") {
//     const date = new Date();
//     date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
//     const expires = "expires=" + date.toUTCString();
//     document.cookie = `${name}=${value}; ${expires}; path=${path}`;
// }

// Function to delete a cookie (expire it)
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

// Check if "user_session" cookie exists
if (!getCookie("user_session")) {
    // If not found, redirect to first_page.html
    window.location.href = "http://127.0.0.1:5500/Landing_page/first_page.html";
}

// Add event listener for logout button
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout_link");
    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            // Delete the session cookie
            deleteCookie("user_session");

            // Redirect to first_page.html
            window.location.href = "http://127.0.0.1:5500/Landing_page/first_page.html";
        });
    }
});

// deleteCookie("user_session") ;