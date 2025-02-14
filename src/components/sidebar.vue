<script setup>
import HomeTab from './homeTab.vue';
import InitialMarkersTab from './initialMarkersTab.vue';
import CustomMarkersTab from './customMarkersTab.vue';


</script>

<template>
<div id="sidebar" class="sidebar sidebar--collapsed">
      <!-- Nav tabs -->
      <div class="sidebar__tabs">
        <ul role="tablist" class="sidebar__tabs-list">
          <li class="sidebar__tabs-item"><a href="#home" role="tab" class="sidebar__tabs-link"><i class="fa fa-bars"></i></a></li>
          <li class="sidebar__tabs-item"><a href="#InitialMarkersTab" role="tab" class="sidebar__tabs-link"><i class="fa-solid fa-book-open-reader"></i></a></li>
          <li class="sidebar__tabs-item"><a href="#CustomMarkersTab" role="tab" class="sidebar__tabs-link"><i class="fa-solid fa-location-dot"></i></a></li>
        </ul>

        <ul role="tablist" class="sidebar__tabs-list">
          <li class="sidebar__tabs-item sidebar__tabs-item--disabled"><a href="#settings" role="tab" class="sidebar__tabs-link"><i class="fa fa-gear"></i></a></li>
        </ul>
      </div>
      
      
      <div class="sidebar__content">
        <!-- import tab components here -->
         <!-- Tab panes -->
        <HomeTab />
        <InitialMarkersTab />
        <CustomMarkersTab />
        
        

      </div>
    </div>
</template>

<style lang="scss">



.sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  z-index: 2000;
  box-shadow: 0 1px 5px var(--box-shadow-sidebar);
}

.sidebar.sidebar--collapsed {
  width: var(--sidebar-sizing-desktop);
}
.sidebar.leaflet-touch {
  box-shadow: none;
  border-right: 2px solid var(--sidebar-crl-border);
}

.sidebar--left {
  left: 0;
}
.sidebar--right {
  right: 0;
}




.sidebar__tabs {
  top: 0;
  bottom: 0;
  height: 100%;
  background-color: var(--sidebar-crl-primary);
  padding: 1.25rem 0; 
}
.sidebar--left .sidebar__tabs {
  left: 0;
}
.sidebar--right .sidebar__tabs {
  right: 0;
}

.sidebar__tabs-list {
  position: absolute;
  width: var(--sidebar-sizing-desktop);
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.sidebar__tabs-item {
  width: 100%;
  color: var(--font-crl-primary); /* sidebar icon color */
  font-size: 21pt; /* sidebar icon size */
  overflow: hidden;
  transition: all 80ms;
}
.sidebar__tabs-item:hover,
.sidebar__tabs-item--active {
  background-color: var(--active-hover-crl);
  
}

.sidebar__tabs-item--disabled {
}
.sidebar__tabs-item--disabled:hover {
  background: transparent;
}
.sidebar__tabs-item--disabled .sidebar__tabs-link {
  cursor: default;
}


.sidebar__tabs-link {
  display: block;
  width: 100%;
  height: 100%;
  line-height: var(--sidebar-sizing-desktop);
  color: inherit;
  text-decoration: none;
  text-align: center;
}
.sidebar__tabs .sidebar__tabs-list:last-child {
  bottom: 0;
}

.sidebar__content {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: var(--sidebar-crl-primary);
  overflow-x: hidden;
  overflow-y: auto;
}
.sidebar--left .sidebar__content {
  left: var(--sidebar-sizing-desktop);
  right: 0;
}
.sidebar--right .sidebar__content {
  right: 0;
  left: var(--sidebar-sizing-desktop);
}

.sidebar.sidebar--collapsed > .sidebar__content {
  overflow-y: hidden;
}

.sidebar__pane {
  display: none;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding: 1rem 2rem;
}
.sidebar__pane--active {
  display: block;
}

.sidebar__pane-header {
  width: 100%;
  height: 3rem;
  color: var(--font-crl-primary);
  text-align: center;
}

.sidebar__pane-header::after {
  content: '';
  display: block;
  width: 100%;
  height: .15rem;
  background-color: var(--font-crl-primary);
}

.sidebar__pane-content {
  margin: 2rem 0 ;
  color: var(--font-crl-primary);
}

.sidebar__pane-title {
  width: 100%;
  display: inline;
  font-size: 25pt;
  padding-bottom: 1rem;
}

.sidebar__pane-close {
  position: absolute;
  top: 1rem;
  width: 40px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  font-size: 18pt;
}
.sidebar--left .sidebar__pane-close {
  right: 0;
}
.sidebar--right .sidebar__pane-close {
  left: 0;
}







@media (min-width: 768px) {
  .sidebar {
    top: 0;
    bottom: 0;
    transition: width var(--transition-speed);
  }
  .sidebar--left ~ .sidebar-map .leaflet-left,
  .sidebar--right ~ .sidebar-map .leaflet-right  {
    transition: var(--transition-speed);
  }
  .sidebar--left.sidebar--collapsed ~ .sidebar-map .leaflet-left {left: 50px;}
  .sidebar--right.sidebar--collapsed ~ .sidebar-map .leaflet-right {right: 50px;}
}

@media (min-width: 768px) and (max-width: 991px) {
  .sidebar {width: var(--sidebar-width-768);}
  .sidebar__pane {min-width: var(--pane-width-768);}
  .sidebar--left ~ .sidebar-map .leaflet-left {left: var(--sidebar-position-768);}
  .sidebar--right ~ .sidebar-map .leaflet-right {right: var(--sidebar-position-768);}
}

@media (min-width: 992px) and (max-width: 1199px) {
  .sidebar {width: var(--sidebar-width-992);}
  .sidebar__pane {min-width: var(--pane-width-992);}
  .sidebar--left ~ .sidebar-map .leaflet-left {left: var(--sidebar-position-992);}
  .sidebar--right ~ .sidebar-map .leaflet-right {right: var(--sidebar-position-992);}
}

@media (min-width: 1200px) {
  .sidebar {
    top: 0;
    bottom: 0;
    width: var(--sidebar-width-1200);
  }
  .sidebar__pane {min-width: var(--pane-width-1200);}
  .sidebar--left ~ .sidebar-map .leaflet-left {left: var(--sidebar-position-1200);}
  .sidebar--right ~ .sidebar-map .leaflet-right {right: var(--sidebar-position-1200);
  }
}






</style>
