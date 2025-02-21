import { defineStore } from 'pinia';
const MAP_SETTINGS_PATH = 'http://127.0.0.1/maps.php';
export const useMapSettingsStore = defineStore('mapSettingsStore', {
    state: () => ({
      mapData: null,
    }),
    actions: {
      setMapData(data) {
        this.mapData = data;
      },
    },
  });


// export const useMapSettingsStore = defineStore('mapSettingsStore', {
//   state: (minZoom, maxZoom) => ({
//       minZoom: minZoom,
//       maxZoom: maxZoom,
//   }),
//   getters: {
//     getMinZoom() {
//       return this.minZoom;
//     },
//     getMaxZoom() {
//       return this.maxZoom;
//     },
//   },
//   actions: {
//     setMinZoom(minZoom) {
//       this.minZoom = minZoom;
//     },
//     setMaxZoom(maxZoom) {
//       this.maxZoom = maxZoom;
//     },
//   },
// });


  export const useMapDataStore = defineStore('mapDataStore', {
    state: (title, description) => ({
        mapTitle: title,
        mapDescription: description,
    }),
    getters: {
      getMapTitle() {
        return this.mapTitle;
      },
      getMapDescription() {
        return this.mapDescription;
      },
    },
    actions: {
        setMapTitle(title) {
            this.mapTitle = title;
        },
        setMapDescription(description) {
            this.mapDescription = description;
        },
    },
  });


const initializeMapDataStore = async ()=> {
  try {
    // Fetch map data
    const response = await fetch(MAP_SETTINGS_PATH);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
      const mapDataStore = useMapDataStore();
      mapDataStore.setMapTitle(data.mapName);
      mapDataStore.setMapDescription(data.mapDescription);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
 };




// const initializeMapSettingsStore = async () => {
//   try {
//     // Fetch map settings
//     const response = await fetch(MAP_SETTINGS_PATH);
//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.statusText}`);
//     }
//     const data = await response.json();
//       const mapStore = useMapSettingsStore();
//       mapStore.setMinZoom(data.minZoom);
//       mapStore.setMaxZoom(data.maxZoom);
//       } catch (error) {
//           console.error('Error initializing map:', error);
//   }
// };




const initializeMapSettingsStore = async () => {
    try {
      // Fetch map settings
      const response = await fetch(MAP_SETTINGS_PATH);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
        const mapStore = useMapSettingsStore();
        mapStore.setMapData(data);
        } catch (error) {
            console.error('Error initializing map:', error);
    }
};


initializeMapSettingsStore();
initializeMapDataStore();
