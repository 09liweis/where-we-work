<template>
    <div id="mapContainer">
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
                <p v-if="infoWindow.content.website"><a :href="infoWindow.content.website" target="_blank">{{infoWindow.content.website}}</a></p>
                <p>{{infoWindow.content.title}}</p>
                <p>{{infoWindow.content.company}}</p>
                <p>{{infoWindow.content.address}}</p>
            </gmap-info-window>
        </gmap-map>
        <div id="workplaces">
            <h2>List of current work places</h2>
            <div class="workplace" v-for="m in this.$store.state.map.markers">
                <h3>{{m.company}}</h3>
                <p>{{m.address}}</p>
            </div>
        </div>
    </div>
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
                website: m.user.website,
                address: m.address,
                company: m.company
            };
        }
    }
};
</script>
<style>
#mapContainer {
    width: 100%;
    height: 100%;
    position: absolute !important;
    top: 0;
    left: 0;
}
#workplaces {
    padding: 20px;
    position: absolute;
    top: 64px;
    right: 0;
    width: 400px;
    background-color: #ffffff;
}
.vue-map-container {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute !important;
    z-index: 0;
}
</style>