
<script setup>
import { ref, provide, onMounted } from 'vue';


// Constants for map configuration
const MAP_PATH = 'http://127.0.0.1/maps/test/{z}/{y}/{x}.webp';
const MAP_SETTINGS_PATH = 'http://127.0.0.1/maps.php';

// Function to initialize the map with settings
const initializeMap = async () => {
  try {
    // Fetch map settings
    const response = await fetch(MAP_SETTINGS_PATH);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();

    // Create the tile layer with fetched settings
    const fullmap = L.tileLayer(MAP_PATH, {
      minZoom: data.mapMinZoom,
      maxZoom: data.mapMaxZoom,
      continuousWorld: false,
      noWrap: true,
      updateWhenIdle: true,
      keepBuffer: 32,
      format: 'image/webp',
      edgeBufferTiles: 16,
    });

    // Initialize the Leaflet map
    map.value = L.map('map', {
      layers: [fullmap],
      zoomSnap: 0.25,
      zoomControl: false,
    }).setView([0, 0], 2);

    // Add controls to the map
    L.control.zoom({ position: 'topright' }).addTo(map.value);
    const sidebar = L.control.sidebar('sidebar').addTo(map.value);
    const layerControl = L.control
      .layers(null, null, { collapsed: true })
      .addTo(map.value);

  } catch (error) {
    console.error('Error initializing map:', error);
    // Here you might want to show an error message to the user
  }
};

// Initialize the map when the component is mounted
onMounted(() => {
  initializeMap();
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
