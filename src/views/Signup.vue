<template>
    <div id="signup" class="main-inner">
        <h2>Sign Up</h2>
        <mu-text-field label="Email" v-model="email" labelFloat fullWidth />
        <mu-text-field type="password" v-model="password" label="Password" labelFloat fullWidth />
        <mu-raised-button label="Sign Up" class="demo-raised-button" primary v-on:click="handleSignUp" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    computed: {
        
    },
    mounted() {

    },
    methods: {
        handleSignUp() {
            
        }
    }
};
</script>
<style>
#signup {
    max-width: 320px;
}
</style>