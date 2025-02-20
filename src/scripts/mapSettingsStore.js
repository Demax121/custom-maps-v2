import { defineStore } from 'pinia';
const MAP_SETTINGS_PATH = 'http://127.0.0.1/maps.php';
export const mapSettingsStore = defineStore('settingsStore', {
    state: () => ({
      mapData: null,
    }),
    actions: {
      setMapData(data) {
        this.mapData = data;
      },
    },
  });

const initializeMapSettings = async () => {
    try {
      // Fetch map settings
      const response = await fetch(MAP_SETTINGS_PATH);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
        const mapStore = mapSettingsStore();
        mapStore.setMapData(data);
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    };

initializeMapSettings();
