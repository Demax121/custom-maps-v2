<script setup>
/* global L */

/**
 * @name Sidebar
 * @class L.Control.Sidebar
 * @extends L.Control
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @see L.control.sidebar
 */
 L.Control.Sidebar = L.Control.extend(/** @lends L.Control.Sidebar.prototype */ {
    includes: (L.Evented.prototype || L.Mixin.Events),

    options: {
        position: 'left'
    },

    initialize: function (id, options) {
        var i, child;

        L.setOptions(this, options);

        // Find sidebar HTMLElement
        this._sidebar = L.DomUtil.get(id);

        // Attach .sidebar--left/right class
        L.DomUtil.addClass(this._sidebar, 'sidebar--' + this.options.position);

        // Attach touch styling if necessary
        if (L.Browser.touch)
            L.DomUtil.addClass(this._sidebar, 'leaflet-touch');

        // Find sidebar > div.sidebar__content
        for (i = this._sidebar.children.length - 1; i >= 0; i--) {
            child = this._sidebar.children[i];
            if (child.tagName == 'DIV' &&
                    L.DomUtil.hasClass(child, 'sidebar__content'))
                this._container = child;
        }

        // Find sidebar ul.sidebar__tabs > li, sidebar .sidebar__tabs > ul > li
        this._tabitems = this._sidebar.querySelectorAll('ul.sidebar__tabs > li, .sidebar__tabs > ul > li');
        for (i = this._tabitems.length - 1; i >= 0; i--) {
            this._tabitems[i]._sidebar = this;
        }

        // Find sidebar > div.sidebar__content > div.sidebar__pane
        this._panes = [];
        this._closeButtons = [];
        for (i = this._container.children.length - 1; i >= 0; i--) {
            child = this._container.children[i];
            if (child.tagName == 'DIV' &&
                L.DomUtil.hasClass(child, 'sidebar__pane')) {
                this._panes.push(child);

                var closeButtons = child.querySelectorAll('.pane__close');
                for (var j = 0, len = closeButtons.length; j < len; j++)
                    this._closeButtons.push(closeButtons[j]);
            }
        }
    },

    /**
     * Add this sidebar to the specified map.
     *
     * @param {L.Map} map
     * @returns {Sidebar}
     */
    addTo: function (map) {
        var i, child;

        this._map = map;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            var sub = child.querySelector('a');
            if (sub.hasAttribute('href') && sub.getAttribute('href').slice(0,1) == '#') {
                L.DomEvent
                    .on(sub, 'click', L.DomEvent.preventDefault )
                    .on(sub, 'click', this._onClick, child);
            }
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent.on(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    /**
     * @deprecated - Please use remove() instead of removeFrom(), as of Leaflet 0.8-dev, the removeFrom() has been replaced with remove()
     * Removes this sidebar from the map.
     * @param {L.Map} map
     * @returns {Sidebar}
     */
     removeFrom: function(map) {
         console.log('removeFrom() has been deprecated, please use remove() instead as support for this function will be ending soon.');
         this.remove(map);
     },

    /**
     * Remove this sidebar from the map.
     *
     * @param {L.Map} map
     * @returns {Sidebar}
     */
    remove: function (map) {
        var i, child;

        this._map = null;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            L.DomEvent.off(child.querySelector('a'), 'click', this._onClick);
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent.off(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    /**
     * Open sidebar (if necessary) and show the specified tab.
     *
     * @param {string} id - The id of the tab to show (without the # character)
     */
    open: function(id) {
        var i, child;

        // hide old active contents and show new content
        for (i = this._panes.length - 1; i >= 0; i--) {
            child = this._panes[i];
            if (child.id == id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // remove old active highlights and set new highlight
        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            if (child.querySelector('a').hash == '#' + id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        this.fire('pane__content', { id: id });

        // open sidebar (if necessary)
        if (L.DomUtil.hasClass(this._sidebar, 'sidebar--collapsed')) {
            this.fire('opening');
            L.DomUtil.removeClass(this._sidebar, 'sidebar--collapsed');
        }

        return this;
    },

    /**
     * Close the sidebar (if necessary).
     */
    close: function() {
        // remove old active highlights
        for (var i = this._tabitems.length - 1; i >= 0; i--) {
            var child = this._tabitems[i];
            if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // close sidebar
        if (!L.DomUtil.hasClass(this._sidebar, 'sidebar--collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(this._sidebar, 'sidebar--collapsed');
        }

        return this;
    },

    /**
     * @private
     */
    _onClick: function() {
        if (L.DomUtil.hasClass(this, 'active'))
            this._sidebar.close();
        else if (!L.DomUtil.hasClass(this, 'tabs__item--disabled'))
            this._sidebar.open(this.querySelector('a').hash.slice(1));
    },

    /**
     * @private
     */
    _onCloseClick: function () {
        this.close();
    }
});

/**
 * Creates a new sidebar.
 *
 * @example
 * var sidebar = L.control.sidebar('sidebar').addTo(map);
 *
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @returns {Sidebar} A new sidebar instance
 */
L.control.sidebar = function (id, options) {
    return new L.Control.Sidebar(id, options);
};



</script>

<template>

<div id="sidebar" class="sidebar sidebar--collapsed">
      <!-- Nav tabs -->
      <div class="sidebar__tabs">
        <ul role="tablist" class="tabs__list">
          <li class="tabs__item"><a href="#home" role="tab" class="tabs__link"><i class="fa fa-bars"></i></a></li>
        </ul>

        <ul role="tablist" class="tabs__list">
          <li class="tabs__item tabs__item--disabled"><a href="#settings" role="tab" class="tabs__link"><i class="fa fa-gear"></i></a></li>
        </ul>
      </div>
      <!-- Tab panes -->
      <div class="sidebar__content">
        <div class="sidebar__pane" id="home">
            <div class="pane__header">
                <h1 class="pane__title">sidebar-v2</h1>
                <span class="pane__close"><i class="fa fa-caret-left"></i></span>
            </div>
            <div class="pane__content">
                <p> A responsive sidebar for mapping libraries like </p>
            </div>
        </div>
      </div>
    </div>



</template>

<style lang="scss">

:root{
  --sidebar-crl-primary: rgba(0, 0, 0, .8);
  --font-crl-primary: rgb(255, 255, 255);
  --box-shadow-sidebar: rgba(0, 0, 0, 0.65);
  --sidebar-crl-border:rgba(0, 0, 0, 0.2);
  --tab-crl-primary: rgba(63, 63, 63, 0.5);
  --active-hover-crl: rgba(255, 255, 255, 0.2);

  --sidebar-sizing-desktop: 4rem;
  --sidebar-sizing-mobile: 2rem;
  --transition-speed: 0.5s;

  --sidebar-position-1200: 470px;
  --sidebar-position-992: 400px;
  --sidebar-position-768: 315px;

  --sidebar-width-1200: 530px;
  --sidebar-width-992: 390px;
  --sidebar-width-768: 305px;

  --pane-width-1200: 420px;
  --pane-width-992: 350px;
  --pane-width-768: 265px;
}

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

.tabs__list {
  position: absolute;
  width: var(--sidebar-sizing-desktop);
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.tabs__item {
  width: 100%;
  color: var(--font-crl-primary); /* sidebar icon color */
  font-size: 21pt; /* sidebar icon size */
  overflow: hidden;
  transition: all 80ms;
}
.tabs__item:hover,
.tabs__item.active {
  background-color: var(--active-hover-crl);
}

.tabs__item--disabled {
}
.tabs__item--disabled:hover {
  background: transparent;
}
.tabs__item--disabled .tabs__link {
  cursor: default;
}


.tabs__link {
  display: block;
  width: 100%;
  height: 100%;
  line-height: var(--sidebar-sizing-desktop);
  color: inherit;
  text-decoration: none;
  text-align: center;
}
.sidebar__tabs .tabs__list:last-child {
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
.sidebar__pane.active {
  display: block;
}

.pane__header {
  width: 100%;
  height: 3rem;
  color: var(--font-crl-primary);
  border-bottom: 2px solid var(--font-crl-primary);
  text-align: center;
  padding-top: .75rem;
}
.pane__content {
  margin-top: 1rem;
  color: var(--font-crl-primary);
}

.pane__title {
  width: 100%;
  display: inline;
}

.pane__close {
  position: absolute;
  top: 1rem;
  width: 40px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  font-size: 2.5rem;
}
.sidebar--left .pane__close {
  right: 0;
}
.sidebar--right .pane__close {
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
