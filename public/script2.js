// Initialize the map
const map = L.map('map').setView([45, 0], 10);  // Set initial view to [latitude, longitude] and zoom level

// Create a tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Initialize an array to store waypoints
let waypoints = [];

// Create a polyline to represent the route
const route = L.polyline([], { color: 'red' }).addTo(map);

// Function to handle when a click event occurs on the map
function onMapClick(e) {
  // Add the clicked coordinates to the waypoints array
  waypoints.push(e.latlng);

  // Update the route with the new waypoints
  route.setLatLngs(waypoints);

  // Add a marker at the clicked coordinates
  L.marker(e.latlng).addTo(map);
}

// Listen for click events on the map and call onMapClick function
map.on('click', onMapClick);