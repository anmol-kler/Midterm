const LibraryCoordinates = { lat: 49.133129, lng: -122.871460 };
const map = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© OpenStreetMap contributors'
}).addTo(map);
const kpuMarker = L.marker([LibraryCoordinates.lat,
LibraryCoordinates.lng]).addTo(map)
 .bindPopup('KPU Surrey Library')
 .openPopup();
5
function calculateDistance(lat1, lon1, lat2, lon2) {
 const R = 6371; 
 const dLat = (lat2 - lat1) * Math.PI / 180;
 const dLon = (lon2 - lon1) * Math.PI / 180;
 const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
 Math.sin(dLon / 2) * Math.sin(dLon / 2);
 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 return R * c;
}
navigator.geolocation.getCurrentPosition((position) => {
 const userCoords = {
 lat: position.coords.latitude,
 lng: position.coords.longitude
 };
 map.setView([userCoords.lat, userCoords.lng], 13);
 L.marker([userCoords.lat, userCoords.lng]).addTo(map)
 .bindPopup('You are here')
 .openPopup();
 const distance = calculateDistance(userCoords.lat, userCoords.lng,
LibraryCoordinates.lat, LibraryCoordinates.lng);
 document.getElementById('distance').textContent = `Distance from your location to KPU Library, Surrey is:
${distance.toFixed(2)} km`;
});
