<template>
    <div id="editProfile" class="main-inner">
        <h2>Edit Profile</h2>
        <mu-text-field label="Name" v-model="user.name" labelFloat fullWidth />
        <mu-text-field label="Title" v-model="user.title" labelFloat fullWidth />
        <div class="mu-text-field has-label no-empty-state full-width">
            <h4>Current Company: {{place.name}}</h4>
            <GmapAutocomplete class="mu-text-field-input" @place_changed="setPlace"></GmapAutocomplete>
        </div>
        <br/>
        <mu-raised-button label="Update" class="demo-raised-button" primary v-on:click="handleUpdate" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {
                name: '',
                title: ''
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
    mounted() {
        this.$http.get(this.$store.state.api.userDetail).then(res => {
            if (res.status == 200) {
                this.user.name = res.body.name;
                this.user.title = res.body.title;
                this.place = res.body.place;
            }
        }, res => {
            //
        });
    },
    methods: {
        setPlace(place) {
            this.place.name = place.name;
            this.place.lat = place.geometry.location.lat();
            this.place.lng = place.geometry.location.lng();
            this.place.address = place.formatted_address;
            this.place.google_place_id = place.place_id;
        },
        handleUpdate() {
            const params = {
                user: {
                    name: this.user.name,
                    title: this.user.title
                },
                place: this.place
            };
            this.$http.post(this.$store.state.api.updateUser, params).then(res => {
                console.log(res);
                this.$router.push('/');
            }, res => {
                
            });
        }
    }
};
</script>
