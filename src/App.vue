<template>
    <div class="container">
        <header id="header">
            <h1>Where We Work</h1>
            <router-link to="/signup">Sign Up</router-link>
        </header>
        <GoogleMap />
        <main id="main">
            <router-view></router-view>
        </main>
    </div>
</template>
<script>
import GoogleMap from './components/GoogleMap.vue';
export default {
    name: 'app',
    components: {
        GoogleMap
    },
    data() {
        return {
            
        };
    },
    computed: {
        
    },
    mounted() {

    },
    methods: {
        
    }
};
</script>
<style type="text/css">
html, body {
    height: 100%;
}
#header {
    position: absolute;
    top: 0px;
    z-index: 1;
}
#main {
    position: absolute;
    z-index: 1;
}
</style>