<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  mounted() {
    this.initMap(); 
  },
  methods: {
    initMap() {
      const collegeLocation = [54.8820, 69.1396];
      const map = L.map('map').setView(collegeLocation, 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);
      
      L.marker(collegeLocation).addTo(map)
        .bindPopup('Колледж им. Магжана Жумабаева')
        .openPopup();
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = [position.coords.latitude, position.coords.longitude];

          map.setView(userLocation, 15);

          L.marker(userLocation).addTo(map)
            .bindPopup('Вы здесь!')
            .openPopup();
        }, (error) => {
          alert("Ошибка при получении геолокации: " + error.message);
        });
      } else {
        alert("Геолокация не поддерживается вашим браузером.");
      }
    },
  },
};
</script>

<style scoped>
#map {
  border: 5px solid #343434; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  margin-left:10% ;
  margin-top: 2%;
  height: 850px; 
  width: 80%; 
}
</style>
