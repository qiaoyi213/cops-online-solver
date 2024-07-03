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
    
    var answer = new Array()
    
    for(var i = 0;i<inpSet.value.split(',').length;i++){
        
        if(result.data[`x${i}`]){
            answer.push(inpSet.value.split(',')[i])
        }
    }
    
    sspBestSample.value = "One of fessible answer is " + answer;
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
            <p>Please input the target</p>
            <label>
                <input v-model="target" placeholder="10">
            </label>
            <button type="submit">Submit</button>
        </form>
        <div>
            <p id="sspAnswer"> {{ sspBestSample }}</p>
        </div>
    </div>
</template>


<style>
.ssp{
    top: 64px;
    left: 10px; 
    padding: 10px;
    width: 640px;
    height: 400px;
    position: relative;
    border-radius: 25px;
    text-align: left;
    background-color:darkgoldenrod;
}
</style>