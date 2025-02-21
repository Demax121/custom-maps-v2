<script setup>
import {inject, ref, onMounted, watch } from 'vue';

const mapData = inject('mapSettingsProvided');
const mapTitle = ref(null);

onMounted(() => {
  watch(mapData, (data) => {
    if (data && data.mapName) {
      mapTitle.value = data.mapName;
    } else {
      mapTitle.value = "Map Name";
    }
  });
});



</script>



<template>
<div class="sidebar__pane" id="home">
            <div class="sidebar__pane-header">
                <h1 class="sidebar__pane-title">{{ mapTitle }}</h1>
                <span class="sidebar__pane-close"><i class="fa fa-caret-left"></i></span>
            </div>
            <div class="sidebar__pane-content">
                <p> A responsive sidebar for mapping libraries like </p>
            </div>
        </div>
</template>






<style lang="scss">
    
</style>