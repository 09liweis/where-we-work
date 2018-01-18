<template>
    <gmap-map
        v-if="this.$store.state.map.hasCenter"
        :center="this.$store.state.map.center"
        :zoom="12"
    >
    </gmap-map>
</template>
<script>
export default {
    data() {
        return {
            
        };
    },
    computed: {
        
    },
    mounted() {
        window.navigator.geolocation.getCurrentPosition((p) => {
            const location = {lat: p.coords.latitude, lng: p.coords.longitude};
            this.$store.commit('setMapCenter', location);
        });
    },
    methods: {
        
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