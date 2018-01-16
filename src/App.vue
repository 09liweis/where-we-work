<template>
    <div class="container">
        <h1>Where We Work</h1>
        <gmap-map
            :center="{lat: 10.0, lng: 10.0}"
            :zoom="7"
            style="width: 500px; height: 300px"
        >
        </gmap-map>
        <router-view></router-view>
    </div>
</template>
<style type="text/css">

</style>