import { ref, computed, createApp } from 'vue';
import './style.css';
import './scss/colors.css';
import App from './App.vue';
import { createPinia } from 'pinia'
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);



import { useMapSettingsStore } from './scripts/mapDataStore';
import { useInitialMarkersStore } from './scripts/initialMarkersStore';
const markersStore = useInitialMarkersStore();
const initialMarkers = computed(() => markersStore.markersData);
const settingsStore = useMapSettingsStore();
const mapSettings = computed(() => settingsStore.mapData);



app.provide(/* key */ 'initialMarkersProvided', /* value */ initialMarkers);
app.provide(/* key */ 'mapSettingsProvided', /* value */ mapSettings);



app.mount('#app');


