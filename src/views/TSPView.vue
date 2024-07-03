<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { solveSSP } from '../api.js'
</script>
<template>
    <Navbar></Navbar>
    <div class="tsp">
        <form @submit.prevent="handleSubmit">
            <p>Please input graph per edge per line</p>
            <label>
                <textarea v-model="inpGraph"></textarea>
            </label>
            <p></p>
            <button type="submit">Submit</button>
        </form>
        <div>
            <p>{{ tspBestSample }}</p>
        </div>
    </div>
</template>

<style>
.tsp {
    padding-top: 64px;
    text-align: left;
    background-color:darkgoldenrod;
}
</style>
