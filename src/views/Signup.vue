<template>
    <div id="signup" class="main-inner">
        <h2>Sign Up</h2>
        <mu-text-field label="Email" v-model="user.email" labelFloat fullWidth />
        <mu-text-field type="password" v-model="user.password" label="Password" labelFloat fullWidth />
        <mu-raised-button label="Sign Up" class="demo-raised-button" primary v-on:click="handleSignUp" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {
                email: 'weisen.li@hotmail.com',
                password: '1234'
            }
        };
    },
    computed: {
        
    },
    mounted() {

    },
    methods: {
        handleSignUp() {
            const params = {
                email: this.user.email,
                password: this.user.password
            };
            this.$http.post(this.$store.state.api.signup, params).then(res => {
                
            }, res => {
                //error
            });
        }
    }
};
</script>
<style>
#signup {
    max-width: 320px;
}
</style>