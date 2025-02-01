<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


onMounted(() => {
  var map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
});


</script>

<template>
<div id="map" class="sidebar-map"></div>
</template>

<style lang="scss" scoped>
/* MAP SETUP */
#map{
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    background-color: rgb(34, 37, 43);
}
/* MAP SETUP */

</style>
