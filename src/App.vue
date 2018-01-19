<template>
    <div class="container">
        <header id="header">
            <mu-appbar title="Where We Work">
                <router-link to="/signup" slot="right">Sign Up</router-link>
                <router-link to="/login" slot="right">Login</router-link>
            </mu-appbar>
        </header>
        <GoogleMap />
        <router-view></router-view>
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
        if (this.$store.state.user.login) {
            this.$router.push({ path: '/' });
        }
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
    width: 100%;
}
.main-inner {
    padding: 25px;
    position: absolute;
    z-index: 1;
    width: 100%;
    background-color: #ffffff;
    margin: auto;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>