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
        <h1 id="-subset-sum">子集合 Subset Sum</h1>
        <p>子集合問題（Subset Sum Problem）是一個經典的組合優化問題。給定一組整數和一個目標值，問題要求找到一個子集合，使得子集合中的數字之和等於目標值。</p>
        <h2 id="-">子集合問題的應用</h2>
        <h3 id="-">財務規劃</h3>
        <p>在財務規劃中，投資者可能希望選擇一組投資項目，使得總投資金額等於某個特定的目標，從而達到最佳的資金配置效果。</p>
        <h3 id="-">貨物配載</h3>
        <p>物流公司需要將貨物裝載到卡車上，並希望使裝載的貨物重量正好等於卡車的負載能力，從而提高運輸效率。</p>
        <h3 id="-">工作分配</h3>
        <p>在工作分配中，管理者需要將多項任務分配給員工，使得每個員工的工作量達到某個特定的目標，從而實現公平分配。</p>
        <h2 id="-qubo-">如何使用 QUBO 求解</h2>
        <p>量子無約束二次優化（QUBO）是一種強大的數學建模方法，可以用來求解子集合問題。通過將子集合問題轉換為 QUBO 模型，可以利用量子計算機或其他先進的優化算法來求解。</p>
        
        <vue-latex :expression="'H(x)=(\\sum_{i=0}^{n}s_ix_i-T)^2'" display-mode />

        <h2 id="-">演示</h2>
        <p>你可以在利用下方的輸入框使用模擬退火求解子集合問題，請你輸入你想要求解的集合以及目標。</p>
        <form @submit.prevent="handleSubmit">
            <p>請輸入集合，並且使用 , 分隔元素</p>
            <label>
                <textarea v-model="inpSet" placeholder="1,2,3,4,5"></textarea>
            </label>
            <p>請輸入目標值</p>
            <label>
                <input v-model="target" placeholder="10">
            </label>
            <button type="submit">求解</button>
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
}
</style>