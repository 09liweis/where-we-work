<template>
    <gmap-map
        v-if="this.$store.state.map.hasCenter"
        :center="this.$store.state.map.center"
        :zoom="12"
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
        {{infoWindow.content}}
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
                content: ''
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
        this.$http.get(this.$store.state.api.users).then(res => {
            if (res.status == 200) {
                const users = res.body;
                users.map((user) => {
                    const marker = {
                        title: user.place.name,
                        position: {
                            lat: user.place.lat,
                            lng: user.place.lng
                        }
                    };
                    this.$store.commit('renderMarker', marker);
                });
            }
        }, res => {
            
        });
    },
    methods: {
        handleClickMarker(m) {
            this.infoWindow.position = m.position;
            this.infoWindow.open = true;
            this.infoWindow.content = m.title;
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