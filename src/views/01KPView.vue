<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

</script>

<template>
    <div class="wrap">
        <Navbar></Navbar>
        <div class="kp">
            <input v-model="weights" placeholder="Input weighs as 'w1 w2 w3' format">
            <input v-model="values" placeholder="Input values as 'v1 v2 v3' format">
            <button>Submit</button>
        </div>  
    </div>
</template>

<style>
.kp {
top:100px;
padding: 100px;;
}
</style>

