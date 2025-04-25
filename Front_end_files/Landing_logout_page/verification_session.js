if (!getCookie("Email-Address")) {
    // If not found, redirect to first_page.html
    window.location.href = first_page;
    // console.log("Not found cookie") ;
}

// const express = require("express");
// const cookieParser = require("cookie-parser");

// const app = express();
// const PORT = 3000; // You can change this if needed

// app.use(express.json());
// app.use(cookieParser());

// // POST request to handle redirection and set a cookie
// app.post("/redirect", (req, res) => {
//     // Set a cookie that expires in 1 month
//     res.cookie("user_session", "verified", { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

//     // Redirect to the new landing page
//     res.redirect("https://127.0.0.1:5500/Landing_page_new.html");
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://127.0.0.1:${PORT}`);
// });
