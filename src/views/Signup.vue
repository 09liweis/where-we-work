<template>
    <div id="signup" class="main-inner">
        <h2>Sign Up</h2>
        <mu-text-field label="Email" v-model="user.email" labelFloat fullWidth />
        <mu-text-field label="Name" v-model="user.name" labelFloat fullWidth />
        <mu-text-field label="Title" v-model="user.title" labelFloat fullWidth />
        <mu-text-field type="password" v-model="user.password" label="Password" labelFloat fullWidth />
        <mu-raised-button label="Sign Up" class="demo-raised-button" primary v-on:click="handleSignUp" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {
                email: '',
                name: '',
                title: '',
                password: ''
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
                name: this.user.name,
                title: this.user.title,
                email: this.user.email,
                password: this.user.password
            };
            this.$http.post(this.$store.state.api.signup, params).then(res => {
                if (res.status == 200) {
                    const user = res.body.data.user;
                    this.$store.commit('login', user);
                    this.$router.push('/editProfile');
                } else {
                    alert('Something wrong');
                }
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