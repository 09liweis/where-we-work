<template>
    <gmap-map
        v-if="this.$store.state.map.hasCenter"
        :center="this.$store.state.map.center"
        :zoom="15"
        @click="handleClickMap()"
    >
        <gmap-marker
            :key="index"
            v-for="(m, index) in this.$store.state.map.markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="handleClickMarker(m)"
        ></gmap-marker>
        <gmap-info-window :options="infoWindow.option" :position="infoWindow.position" :opened="infoWindow.open" @closeclick="infoWindow.open=false">
        <p>{{infoWindow.content.name}}</p>
        <p>{{infoWindow.content.title}}</p>
        <p>{{infoWindow.content.company}}</p>
        <p>{{infoWindow.content.address}}</p>
      </gmap-info-window>
    </gmap-map>
</template>
<script>
export default {
    data() {
        return {
            infoWindow: {
                open: false,
                option: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                position: {
                    lat: 0,
                    lng: 0
                },
                content: {
                    name: '',
                    title: '',
                    address: '',
                    company: ''
                }
            }
        };
    },
    computed: {
        
    },
    mounted() {
        window.navigator.geolocation.getCurrentPosition((p) => {
            const location = {lat: p.coords.latitude, lng: p.coords.longitude};
            this.$store.commit('setMapCenter', location);
        });
        this.$store.commit('renderMarkers');
    },
    methods: {
        handleClickMap() {
            this.infoWindow.open = false;
        },
        handleClickMarker(m) {
            this.infoWindow.position = m.position;
            this.infoWindow.open = true;
            this.infoWindow.content = {
                name: m.user.name,
                title: m.user.title,
                address: m.address,
                company: m.company
            };
        }
    }
};
</script>
<style>
.vue-map-container {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute !important;
    z-index: 0;
}
</style>