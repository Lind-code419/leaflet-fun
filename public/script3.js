// Initialize the map
const map = L.map('map').setView([44.8, -0.7], 14);

// Create an array to store the coordinates of the journey
let journeyCoordinates = [];

// Initialize the distance variable
let totalDistance = 0;

// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// Create a polyline to represent the route
const route = L.polyline([], { color: 'green' }).addTo(map);

// Track click events on the map to collect journey coordinates
map.on('click', (event) => {
    const latlng = event.latlng;

    // Add the current coordinate to the journey array
    journeyCoordinates.push(latlng);

    // Update the route with the new waypoints
    route.setLatLngs(journeyCoordinates);

    // Add a marker at the clicked coordinates
    L.marker(latlng).addTo(map);
    

    // Calculate distance between previous and current coordinates
    if (journeyCoordinates.length > 1) {
        const prevLatLng = journeyCoordinates[journeyCoordinates.length - 2];
        const distance = latlng.distanceTo(prevLatLng);

        totalDistance += distance; // Update the total distance
        console.log('Distance:', distance.toFixed(2), 'meters');
        console.log('Total Distance ' + totalDistance);
        L.marker(latlng).addTo(map)
        .bindPopup('Total Distance: '  + (totalDistance /1000).toFixed(2) + 'Km').openPopup();
    }
})