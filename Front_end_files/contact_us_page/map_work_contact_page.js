// Initialize the map and set its view to a specific location and zoom level
const map = L.map("map").setView([22.539150198145375, 88.3287817452962], 15);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
    }).addTo(map);

    // Add a marker at the specified location
    const marker = L.marker([22.539150198145375, 88.3287817452962]).addTo(map);

    // Add a popup to the marker
    marker.bindPopup("<b>Voila Amigos!</b><br>Welcome to our office.").openPopup();


// 22.539150198145375, 88.3287817452962