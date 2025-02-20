import { ref, computed, createApp } from 'vue';
import './style.css';
import './scss/colors.css';
import App from './App.vue';
import { createPinia } from 'pinia'
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);



import { mapSettingsStore } from './scripts/mapSettingsStore';
import { initialMarkersStore } from './scripts/initialMarkersStore';
const markersStore = initialMarkersStore();
const initialMarkers = computed(() => markersStore.markersData);
const settingsStore = mapSettingsStore();
const mapSettings = computed(() => settingsStore.mapData);



app.provide(/* key */ 'initialMarkersProvided', /* value */ initialMarkers);
app.provide(/* key */ 'mapSettingsProvided', /* value */ mapSettings);



app.mount('#app');


