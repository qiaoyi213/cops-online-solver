<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { solveMCP } from '../api.js'

const inpGraph = ref('')
const mcpBestSample = ref('Not submitted yet')

async function handleSubmit() {
    mcpBestSample.value = `Submitted: ${inpGraph.value}`
    // split each element in array
    
    var edgeArray = inpGraph.value.split('\n')
    for (var i = 0; i < edgeArray.length;i++){
        edgeArray[i] = edgeArray[i].split(' ').map(function(x){
            return parseInt(x, 10)
        })
    }

    const requestData = {
        graph: edgeArray, // 將輸入的字符串轉換為數字數組
    }

    const result = await solveMCP(requestData)
    console.log(result);
    mcpBestSample.value = result["data"]
    
}
</script>

<template>
    <Navbar></Navbar>
    <div class="mcp">
        <form @submit.prevent="handleSubmit">
            <p>Please input graph per edge per line</p>
            <label>
                <textarea v-model="inpGraph"></textarea>
            </label>
            <p></p>
            <button type="submit">Submit</button>
        </form>
        <div>
            <p>{{ mcpBestSample }}</p>
        </div>
    </div>
</template>

<style>
.mcp {
    padding-top: 64px;
    text-align: left;
    background-color:darkgoldenrod;
}
</style>
