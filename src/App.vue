<template>
    <div class="container">
        <h1>What I watched</h1>
        <div class="layout">
            <router-link to="/visuals">Visuals</router-link>
            <router-link to="/visuals/add">Add</router-link>
            <router-view></router-view>
        </div>
    </div>
</template>
<style type="text/css">
html, body{
    background-color: rgb(236, 236, 236);
}
.container {
    background-color: #ffffff;
    margin: auto;
    width: 100%;
    max-width: 1024px;
    padding: 20px;
}
</style>