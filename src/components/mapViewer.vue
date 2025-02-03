<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const mapPath = "http://127.0.0.1:3315/maps/test/{z}/{y}/{x}.webp";






onMounted(() => {
// Setting up the map layer
const fullmap = L.tileLayer(mapPath, {
  minZoom: 1,
  maxZoom: 5,
  continuousWorld: false,
  noWrap: true,
});
// Initializing the map
const Worldmap = L.map("map", {
  layers: [fullmap],
  zoomSnap: 0.25,
  zoomControl: false,
}).setView([0, 0], 2);
L.control.zoom({position: "topright",}).addTo(Worldmap);
const sidebar = L.control.sidebar("sidebar").addTo(Worldmap);
const layerControl = L.control
  .layers(null, null, { collapsed: true })
  .addTo(Worldmap);



});


</script>

<template>
<div id="map" class="sidebar-map"></div>

</template>

<style lang="scss">
/* MAP SETUP */

#map{
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    background-color: rgb(34, 37, 43);
}

.leaflet-control-zoom-in,
  .leaflet-control-zoom-out {
      width: 3rem!important;
      height: 3rem!important;
      line-height: 3rem!important;
      font-size: 1.75rem!important;
      background-color: var(--controls-crl-primary)!important;
      color: var(--font-crl-primary)!important;
  }

  .leaflet-control-layers {
    font-family: 'abhaya_libreregular';
    background-color: var(--controls-crl-primary);
    color: var(--font-crl-primary);
    font-size: 1.15rem;
}

.leaflet-control-zoom a:hover {
    background-color: var(--active-hover-crl)!important;
}


/* MAP SETUP */

</style>
