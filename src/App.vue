<template>
    <div class="container">
        <header id="header">
            <mu-appbar title="Where We Work">
                <router-link to="/signup" slot="right" v-if="!this.$store.state.user.login">Sign Up</router-link>
                <router-link to="/login" slot="right" v-if="!this.$store.state.user.login">Login</router-link>
                <router-link to="/editProfile" slot="right" v-if="this.$store.state.user.login">Edit Profile</router-link>
                <a v-on:click="handleLogout()" slot="right" v-if="this.$store.state.user.login">Log Out</a>
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
            //this.$router.push({ path: '/' });
        }
    },
    methods: {
        handleLogout() {
            this.$store.commit('logout');
            this.$router.push('/');
        }
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
    max-width: 320px;
    padding: 25px;
    position: absolute;
    z-index: 1;
    width: 100%;
    background-color: #ffffff;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>