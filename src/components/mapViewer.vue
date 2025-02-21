
<script setup>
import {inject, ref, onMounted, watch } from 'vue';
const initialMarkers = inject('initialMarkersProvided');
const mapSettings = inject('mapSettingsProvided');


// Constants for map configuration
const MAP_PATH = 'http://127.0.0.1/maps/test/{z}/{y}/{x}.webp';
const Worldmap = ref(null);
const sidebar = ref(null);
const layerControl = ref(null);

function initializeMap(mapMinZoom, mapMaxZoom) {
  const fullmap = L.tileLayer(MAP_PATH, {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    continuousWorld: false,
    noWrap: true,
    updateWhenIdle: true,
    keepBuffer: 32,
    format: 'image/webp',
    edgeBufferTiles: 16,
  });

  // Initialize the Leaflet map
  Worldmap.value = L.map('map', {
    layers: [fullmap],
    zoomSnap: 0.25,
    zoomControl: false,
  }).setView([0, 0], 2);

    L.control.zoom({ position: "topright" }).addTo(Worldmap.value);
    sidebar.value = L.control.sidebar('sidebar').addTo(Worldmap.value);
    layerControl.value = L.control.layers(null, null, { collapsed: true }).addTo(Worldmap.value);
}


function createIcon (icon){
  if (icon == null){
    icon = 'basic.webp';
  }
  return new L.Icon({
      iconUrl: `assets/markerIcons/${icon}`,
      shadowUrl: `assets/markerIcons/marker-shadow.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
  });  
}


function addMarkersToMap(markers, map) {
  markers.forEach(marker => {
    L.marker(marker.coordinates,  {icon: createIcon(marker.markerIcon)}).addTo(map).bindPopup(marker.markerName);
  });
}

onMounted( ()=> {

  watch(mapSettings, (settings) => {
    initializeMap(settings.mapMinZoom, settings.mapMaxZoom);
  });

  watch([initialMarkers, Worldmap], ([markers, map]) => {
    if (markers && map) {
      addMarkersToMap(markers, map);
    }
  });
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
    background-color: var(--bg-crl-primary);
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
.leaflet-control-attribution{
  display: none!important;
}

/* MAP SETUP */

</style>
