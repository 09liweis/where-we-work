<template>
    <div>
        <h2>List Visual</h2>
        <mu-circular-progress :size="90" color="red" v-if="list.length == 0"/>
        <mu-row gutter v-if="list.length > 0">
            <mu-col class="visual" v-for="v in list" :key="v.id" desktop="20" tablet="25" width="50">
                <mu-card>
                    <mu-card-media title="" subTitle="">
                        <img class="visual__poster" :src="v.poster" />
                    </mu-card-media>
                    <mu-card-actions>
                        <a class="visual__rating link" v-bind:href="getLink(v, 'douban')" target="_blank">
                            <img class="visual__rating icon" src="https://img3.doubanio.com/f/talion/2f3c0bc0f35b031d4535fd993ae3936f4e40e6c8/pics/icon/dou32.png" alt="douban icon" />
                            <span class="visual__rating">{{v.douban_rating}}</span>
                        </a>
                        <a>
                            <img class="visual__rating icon" src="https://icons.iconarchive.com/icons/danleech/simple/512/imdb-icon.png" alt="imdb icon" />
                            <span class="visual__rating">{{v.imdb_rating}}</span>
                        </a>
                        <a>
                            <img class="visual__rating icon" src="https://vignette.wikia.nocookie.net/greatest-movies/images/1/16/Rotten_Tomatoes_fresh_rating_icon.png/revision/latest?cb=20170918174417" alt="Rotten Tomatoes Icon" />
                            <span class="visual__rating">{{v.rotten_rating}}</span>
                        </a>
                        <div>Total Episodes: {{v.episodes}}</div>
                        <div>Current Episode: {{v.current_episode}}</div>
                        <router-link :to="{ name: 'edit', params: { id: v.id }}">Edit</router-link>
                    </mu-card-actions>
                </mu-card>
            </mu-col>
        </mu-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                loading: true
            };
        },
        mounted() {
            this.getVisuals();
        },
        methods: {
            getVisuals() {
                this.$http.get(this.$store.state.api.visualList).then(res => {
                    this.list = res.body.results;
                    this.loading = false;
                });
            },
            getLink(v, type) {
                if (type == 'douban') {
                    return 'https://movie.douban.com/subject/' + v.douban_id;
                }
            }
        }
    };
</script>
<style>
    .visual {
        margin-bottom: 20px;
    }
    .visual__poster {
        border-radius: 4px;
    }
    .visual__rating {
        display: inline-block;
        vertical-align: middle;
    }
    .visual__rating.icon {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
</style>