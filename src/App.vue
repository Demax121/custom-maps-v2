<script setup>
import { provide } from 'vue';

import mapViewer from './components/mapViewer.vue'
import sidebar from './components/sidebar.vue'

</script>

<template>

<sidebar />
<mapViewer />

</template>

<style lang="scss">

#app{
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    background-color: var(--bg-crl-primary);
}

</style>
