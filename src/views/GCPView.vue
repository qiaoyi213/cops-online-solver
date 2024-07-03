<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { solveSSP } from '../api.js'
</script>

<template>
    <Navbar></Navbar>
    <div class="gcp">
        <form @submit.prevent="handleSubmit">
            <p>Please input graph per edge per line</p>
            <label>
                <textarea v-model="inpGraph"></textarea>
            </label>
            <p>Please input the number of colors</p>
            <label>
                <input v-model="numOfColors">
            </label>
            <p></p>
            <button type="submit">Submit</button>
        </form>
        <div>
            <p>{{ gcpBestSample }}</p>
        </div>
    </div>
</template>

<style>
.gcp {
    padding-top: 64px;
    text-align: left;
    background-color:darkgoldenrod;
}
</style>
