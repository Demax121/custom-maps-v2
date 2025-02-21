<script setup>
import {inject, ref, onMounted, watch } from 'vue';
import { useMapDataStore } from '../scripts/mapDataStore';
const dataStore = useMapDataStore();

</script>



<template>
<div class="sidebar__pane" id="home">
            <div class="sidebar__pane-header">
                <h1 class="sidebar__pane-title">{{ dataStore.getMapTitle }}</h1>
                <span class="sidebar__pane-close"><i class="fa fa-caret-left"></i></span>
            </div>
            <div class="sidebar__pane-content">
                <p> {{ dataStore.getMapDescription }} </p>
            </div>
        </div>
</template>






<style lang="scss">
    
</style>