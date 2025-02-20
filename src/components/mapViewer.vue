
<script setup>
import {computed, onMounted, watch } from 'vue';
import { mapSettingsStore } from '../scripts/mapSettingsStore';



// Constants for map configuration
const MAP_PATH = 'http://127.0.0.1/maps/test/{z}/{y}/{x}.webp';

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
    const Worldmap = L.map('map', {
      layers: [fullmap],
      zoomSnap: 0.25,
      zoomControl: false,
    }).setView([0, 0], 2);
L.control.zoom({position: "topright",}).addTo(Worldmap);
const sidebar = L.control.sidebar('sidebar').addTo(Worldmap);
const layerControl = L.control.layers(null, null, { collapsed: true }).addTo(Worldmap);
}

onMounted(() => {
  const settingsStore = mapSettingsStore();
  const mapSettings = computed(() => settingsStore.mapData);
  watch(mapSettings, (settings) => {
    console.log(settings.mapMinZoom);
    initializeMap(settings.mapMinZoom, settings.mapMaxZoom);
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
