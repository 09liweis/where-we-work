<template>
    <div class="container">
        <header id="header">
            <mu-appbar title="Where We Work">
                <mu-flat-button color="white" label="Sign Up" slot="right" v-if="!this.$store.state.user.login" v-on:click="gotoSignUp()"/>
                <mu-flat-button color="white" label="Login" slot="right" v-if="!this.$store.state.user.login" v-on:click="gotoLogin()"/>
                <mu-flat-button color="white" label="Edit Profile" slot="right" v-if="this.$store.state.user.login" v-on:click="gotoEdit()"/>
                <mu-flat-button color="red" label="Logout" slot="right" v-if="this.$store.state.user.login" v-on:click="handleLogout()"/>
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
        gotoSignUp() {
            this.$router.push('/signup');
        },
        gotoLogin() {
            this.$router.push('login');
        },
        gotoEdit() {
            this.$router.push('editProfile');
        },
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