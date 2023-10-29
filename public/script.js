// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// Create an array to store the coordinates of the journey
let journeyCoordinates = [];

// Initialize the distance variable
let totalDistance = 0;

// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// Track click events on the map to collect journey coordinates
map.on('click', (event) => {
    const latlng = event.latlng;

    // Add the current coordinate to the journey array
    journeyCoordinates.push(latlng);

    // Calculate distance between previous and current coordinates
    if (journeyCoordinates.length > 1) {
        const prevLatLng = journeyCoordinates[journeyCoordinates.length - 2];
        const distance = latlng.distanceTo(prevLatLng);

        totalDistance += distance; // Update the total distance
        console.log('Distance:', distance.toFixed(2), 'meters');
        console.log('Total Distance ' + totalDistance);
    }
})