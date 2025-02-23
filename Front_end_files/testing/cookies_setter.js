// Function to set a cookie with a 1-month expiration
function setCookie(name, value) {
    let date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days in milliseconds
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Example Usage: Setting a cookie named "user_session"
setCookie("user_session", "verified");
