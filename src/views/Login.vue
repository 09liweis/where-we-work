<template>
    <div id="login" class="main-inner">
        <h2>Login</h2>
        <mu-text-field label="Email" v-model="user.email" labelFloat fullWidth />
        <mu-text-field type="password" v-model="user.password" label="Password" labelFloat fullWidth />
        <mu-raised-button label="Login" class="demo-raised-button" primary v-on:click="handleLogin" />
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
        handleLogin() {
            const params = {
                email: this.user.email,
                password: this.user.password
            };
            this.$http.post(this.$store.state.api.login, params).then(res => {
                if (res.status == 200) {
                    const user = res.body;
                    this.$store.commit('login', user);
                }
            }, res => {
                //error
            });
        }
    }
};
</script>
<style>
#login {
    max-width: 320px;
}
</style>