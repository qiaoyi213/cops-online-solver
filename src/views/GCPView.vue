<template>
  <Navbar />
    <div class="gcp">
      <h1 id="-graph-coloring">塗色問題 Graph Coloring</h1>
      <h2 id="-">塗色問題</h2>
      <p>塗色問題（Graph Coloring Problem）是一個經典的組合優化問題。給定一個無向圖，問題的目的是為圖中的每個頂點分配一種顏色，使得相鄰的頂點具有不同的顏色，並且使用的顏色數量最少。這個問題在計算機科學、數學和其他領域具有重要的研究價值。</p>
      <h2 id="-">塗色問題的實際應用</h2>
      <h3 id="-">時間表安排</h3>
      <p>在學校或大學的時間表安排中，塗色問題可以用來確定課程安排。每個課程代表一個頂點，相鄰頂點表示有衝突的課程（例如，同一時間段內有相同的學生或教師），需要不同的顏色表示不同的時間段。</p>
      <h3 id="-">頻譜分配</h3>
      <p>在無線通信中，頻譜分配問題可以看作塗色問題。每個無線電台站代表一個頂點，相鄰頂點表示彼此之間有干擾，必須分配不同的頻率（顏色）來避免干擾。</p>
      <h3 id="-">地圖著色</h3>
      <p>在地理學中，地圖著色問題是一個典型的塗色問題。每個地區代表一個頂點，相鄰頂點表示相鄰的地區，這些地區必須使用不同的顏色來區分。</p>
      <h3 id="-">任務分配</h3>
      <p>在多處理器系統中，塗色問題可以用來分配任務。每個任務代表一個頂點，相鄰頂點表示有資源衝突的任務，需要分配到不同的處理器（顏色）。</p>
      <h3 id="-">考試排程</h3>
      <p>在考試排程中，塗色問題可以用來安排考試時間。每個考試科目代表一個頂點，相鄰頂點表示有相同學生的科目，需要安排在不同的時間段（顏色）。</p>
      <h3 id="-">網絡分段</h3>
      <p>在計算機網絡中，塗色問題可以用來確定網絡分段。每個網段代表一個頂點，相鄰頂點表示有直接連接的網段，這些網段需要使用不同的子網（顏色）來避免地址衝突。</p>
      <h3 id="-">工廠排程</h3>
      <p>在工廠排程中，塗色問題可以用來安排機器的使用。每個機器代表一個頂點，相鄰頂點表示有衝突的使用時間，需要分配不同的時間段（顏色）。</p>
      <h3 id="-">資料庫分區</h3>
      <p>在資料庫管理中，塗色問題可以用來確定表的分區策略。每個表代表一個頂點，相鄰頂點表示有衝突的查詢需求，這些表需要分配到不同的分區（顏色）來優化查詢性能。</p>
      <h3 id="-">交通信號燈設置</h3>
      <p>在城市交通管理中，塗色問題可以用來設置交通信號燈。每個路口代表一個頂點，相鄰頂點表示有直接相連的路口，需要使用不同的信號燈相位（顏色）來避免交通堵塞。</p>
      <h3 id="-">社交網絡分析</h3>
      <p>在社交網絡分析中，塗色問題可以用來識別社群。每個用戶代表一個頂點，相鄰頂點表示有直接連接的用戶，這些用戶需要分配到不同的社群（顏色）來分析網絡結構。</p>

      <div id="networkGraph">
        <textarea v-model="graphInput" placeholder="Enter graph data in 'u v' format, one edge per line"></textarea>
        <input v-model="num_colors" placeholder="Enter number of colors.">
        <button @click="handleSubmit">Submit</button>
        <p>{{ gcpBestSample }}</p>
        <div id="container"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Navbar from '../components/Navbar.vue';
  import { solveGCP } from '../api.js'
  </script>
  
  <script>
  import { Graph } from 'graphology';
  import Sigma from 'sigma';
  import { getRandomColorTable } from '../utils.js';
  export default {
    name: 'NetworkGraph',
    
    data() {
      return {
        graphInput: '',
        graph: null,
        num_colors: 2,
        renderer: null,
        nextX: 0,
        nextY: 0,
        gcpBestSample: 'Not submitted'
      };
    },
    watch: {
      graphInput: 'updateGraph'
    },
    mounted() {
      // 延遲初始化，確保容器已經渲染完畢並且具有寬度
      setTimeout(() => {
        this.initNetwork();
      }, 0);
    },
    methods: {
      initNetwork() {
        const container = this.$el.querySelector('#container');
        if (container) {
          this.graph = new Graph();
          this.renderer = new Sigma(this.graph, container);
        } else {
          console.error('Container not found');
        }
      },
      getNextPosition(totalNodes, index) {
        // 圓形佈局：將節點均勻地分佈在圓周上
        const angle = (index / totalNodes) * 2 * Math.PI;
        const radius = 300; // 半徑
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return { x, y };
      },
      updateGraph() {
        if (this.graph) {
          this.graph.clear();
  
          const lines = this.graphInput.split('\n');
          const nodes = new Set();
  
          lines.forEach(line => {
            const [u, v] = line.trim().split(' ');
            if (u && v) {
              nodes.add(u);
              nodes.add(v);
            }
          });
  
          const nodeArray = Array.from(nodes);
          const totalNodes = nodeArray.length;
  
          nodeArray.forEach((node, index) => {
            const position = this.getNextPosition(totalNodes, index);
            this.graph.addNode(node, { label: `Node ${node}`, size: 10, color: '#3498db', ...position });
          });
  
          lines.forEach(line => {
            const [u, v] = line.trim().split(' ');
            if (u && v) {
              this.graph.addEdge(u, v);
            }
          });
  
          this.renderer.refresh();
        }
      },
      async handleSubmit() {

        var edgeArray = this.graphInput.split('\n');
        for (var i = 0; i < edgeArray.length;i++){
            edgeArray[i] = edgeArray[i].split(' ').map(function(x){
                return parseInt(x, 10);
            });
        }
        
        const requestData = {
              graph: edgeArray, // 將輸入的字符串轉換為數字數組
              num_colors: this.num_colors
        }
        console.log(this.num_colors)
        const result = await solveGCP(requestData)

        this.gcpBestSample = result["data"];
        // generate some colors table which has (num_colors) colors and each colors may have vary color
        const colorTable = getRandomColorTable(this.num_colors);
        console.log(colorTable)
        this.graph.forEachNode(node => {
            this.graph.setNodeAttribute(node, 'color', colorTable[result["data"][node]]); // 將顏色設置為紅色
        });
  
        this.renderer.refresh();
      }
    }
  };
  </script>
  
  <style scoped>
   .gcp{
    top: 64px;
    left: 10px; 
    padding: 10px;
    width: 640px;
    height: 400px;
    position: relative;
    border-radius: 25px;
    text-align: left;
}
  #networkGraph {
    top: 100px;
    padding: 100px;
    width: 800px;
    height: 600px;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
  }
  
  #container {
    width: 100%;
    height: 100%;
  }
</style>
  