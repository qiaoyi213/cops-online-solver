<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { solveSSP } from '../api.js'

const inpSet = ref('')
const target = ref('')
const sspBestSample = ref('Not submitted yet')

async function handleSubmit() {
    sspBestSample.value = `Submitted: ${inpSet.value} and target = ${target}`

    const requestData = {
        S: inpSet.value.split(/[\s,]+/).map(Number), // 將輸入的字符串轉換為數字數組
        target: Number(target.value) // 將 target 轉換為數字
    }
    
    
    
    const result = await solveSSP(requestData)
    console.log(result);
    sspBestSample.value = result["data"]
    
}
</script>

<template>
    <Navbar></Navbar>
    <div class="ssp">
        <form @submit.prevent="handleSubmit">
            <p>Please input the Set divided by comma or space</p>
            <label>
                <textarea v-model="inpSet" placeholder="1,2,3,4,5"></textarea>
            </label>
            <p>{{ inpSet }}</p>
            <p>Please input the target</p>
            <label>
                <input v-model="target" placeholder="10">
            </label>
            <p>{{ target }}</p>
            <button type="submit">Submit</button>
        </form>
        <div>
            <p id="sspAnswer"> {{ sspBestSample }}</p>
        </div>
    </div>
</template>


<style>
.ssp{
    padding-top: 64px;
    text-align: left;
    background-color:darkgoldenrod;
}
</style>