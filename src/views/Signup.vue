<template>
    <div id="signup" class="main-inner">
        <h2>Sign Up</h2>
        <mu-text-field label="Email" v-model="user.email" labelFloat fullWidth />
        <mu-text-field label="Name" v-model="user.name" labelFloat fullWidth />
        <mu-text-field label="Title" v-model="user.title" labelFloat fullWidth />
        <mu-text-field label="Website" v-model="user.website" labelFloat fullWidth />
        <mu-text-field type="password" v-model="user.password" label="Password" labelFloat fullWidth />
        <div class="mu-text-field has-label no-empty-state full-width">
            <h4>Current Company: {{place.name}}</h4>
            <GmapAutocomplete class="mu-text-field-input" @place_changed="setPlace"></GmapAutocomplete>
        </div>
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
                website: '',
                password: ''
            },
            place: {
                lat: '',
                lng: '',
                address: '',
                google_place_id: '',
                name: ''
            }
        };
    },
    computed: {
        
    },
    mounted() {

    },
    methods: {
        handleSignUp() {
            const email = this.user.email;
            if (email == '' || this.user.password == '') {
                alert('Email or Password is missing!');
                return false;
            }
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(email).toLowerCase()) == false) {
                alert('Email is not valid');
                return false;
            }
            if (this.place.google_place_id == '') {
                alert('Company is required');
                return false;
            }
            const params = {
                name: this.user.name,
                title: this.user.title,
                website: this.user.website,
                email: email,
                password: this.user.password,
                place: this.place
            };
            this.$http.post(this.$store.state.api.signup, params).then(res => {
                if (res.status == 200) {
                    const user = res.body.data.user;
                    this.$store.commit('login', user);
                    this.$store.commit('renderMarkers');
                    this.$router.push('/editProfile');
                } else {
                    alert('Something wrong');
                }
            }, res => {
                //error
            });
        },
        setPlace(place) {
            this.place.name = place.name;
            this.place.lat = place.geometry.location.lat();
            this.place.lng = place.geometry.location.lng();
            this.place.address = place.formatted_address;
            this.place.google_place_id = place.place_id;
            //when change to a new place need to delete the id
            delete this.place._id;
        }
    }
};
</script>
<style>
#signup {
    max-width: 320px;
}
</style>