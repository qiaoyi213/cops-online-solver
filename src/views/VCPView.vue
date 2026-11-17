<template>
    <div>
      <Navbar />
      <div class="vcp">
        <h1 id="-vertex-cover">頂點覆蓋問題 Vertex Cover</h1>
        <p>頂點覆蓋問題（Vertex Cover Problem）是一個經典的組合優化問題。給定一個無向圖，問題的目的是找到一個頂點集合，使得每一條邊至少有一個端點在這個集合中。這個問題在網絡設計、資源分配和其他領域有廣泛的應用。</p>
        <h2 id="-">頂點覆蓋問題的實際應用</h2>
        <h3 id="-">網絡安全</h3>
        <p>在網絡安全中，頂點覆蓋問題可以用來確定需要監控的節點，以保證網絡中每一條通信路徑都受到監控。這有助於檢測和防止潛在的安全威脅。</p>
        <h3 id="-">資源分配</h3>
        <p>在資源分配中，頂點覆蓋問題可以用來確定需要分配資源的關鍵節點，以確保整個系統的運行效率最大化。例如，在通信網絡中，這可以幫助確定需要加強帶寬的路由節點。</p>
        <h3 id="-">社交網絡分析</h3>
        <p>在社交網絡分析中，頂點覆蓋問題可以用來識別影響力最大的用戶，以確保信息能夠迅速傳播到整個網絡。這在營銷和信息傳播中都具有重要意義。</p>
        <h3 id="-">基因組學</h3>
        <p>在基因組學研究中，頂點覆蓋問題可以用來識別基因網絡中的關鍵基因，以便進一步研究這些基因在生物過程中的作用。這有助於理解疾病機制並開發新的治療方法。</p>
        <h3 id="-">交通管理</h3>
        <p>在交通管理中，頂點覆蓋問題可以用來確定需要安裝交通信號燈或監控攝像頭的路口，以確保交通流量的順暢和安全。這有助於減少交通擁堵和事故。</p>
        <h3 id="-">設施佈局</h3>
        <p>在設施佈局中，頂點覆蓋問題可以用來確定需要設置服務設施的位置，以覆蓋所有需求點。例如，在城市規劃中，這可以幫助確定需要設置醫療站、消防站或學校的位置。</p>
        <h3 id="-">資料庫索引</h3>
        <p>在資料庫管理中，頂點覆蓋問題可以用來確定需要建立索引的資料表欄位，以提高查詢效率。這有助於優化資料庫性能。</p>
        <h3 id="-">通訊網絡設計</h3>
        <p>在通訊網絡設計中，頂點覆蓋問題可以用來確定需要加強的網絡節點，以提高整個網絡的可靠性和穩定性。這有助於保證通信服務的質量。</p>
        <div id="networkGraph">
        <textarea v-model="graphInput" placeholder="Enter graph data in 'u v' format, one edge per line"></textarea>
        <button @click="handleSubmit">Submit</button>
        <p>{{ mcpBestSample }}</p>
        <div id="container"></div>
      </div>
      </div>
      
    </div>
  </template>
  
  <script setup>
  import Navbar from '../components/Navbar.vue';
  import { solveVCP } from '../api.js'
  </script>
  
  <script>
  import { Graph } from 'graphology';
  import Sigma from 'sigma';
  
  export default {
    name: 'NetworkGraph',
    
    data() {
      return {
        graphInput: '',
        graph: null,
        renderer: null,
        nextX: 0,
        nextY: 0,
        mcpBestSample: 'Not submitted',
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
        }
  
        const result = await solveVCP(requestData)
        console.log(result);
        this.mcpBestSample = result["data"];
        
        this.graph.forEachNode(node => {
          if(result["data"][node] == 0){
            this.graph.setNodeAttribute(node, 'color', '#e74c3c'); // 將顏色設置為紅色
          }
          
        });
  
        this.renderer.refresh();
  
      }
    }
  };
  </script>
  
  <style scoped>
  .vcp{
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
  