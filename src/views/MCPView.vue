<template>
    <div>
      <Navbar />
      <div class="mcp">
        <h1 id="-maximum-cut">最大割Maximum Cut</h1>
        <p>最大割問題（Maximum Cut Problem）是一個經典的組合優化問題。給定一個無向圖，問題的目的是將圖的頂點集分成兩個子集，使得在這兩個子集之間的邊的數量最大化。這個問題在計算機科學、運籌學和圖論等領域具有重要的研究價值。</p>
        <h2 id="-">最大割問題的實際應用</h2>
        <h3 id="-">社交網絡分析</h3>
        <p>在社交網絡分析中，最大割問題可以用來識別網絡中的社群結構。通過將社交網絡分割成兩部分，可以發現網絡中的強連接和弱連接，這有助於理解網絡中的互動模式和信息傳播路徑。</p>
        <h3 id="vlsi-">VLSI設計</h3>
        <p>在超大型積體電路（VLSI）設計中，最大割問題可以用來優化電路佈局。通過將電路中的元件分割成兩部分，可以最小化電路中信號線的長度和數量，從而提高電路的性能和可靠性。</p>
        <h3 id="-">資料聚類</h3>
        <p>在資料科學中，最大割問題可以用來進行資料聚類。通過將資料點分割成兩個子集，可以發現資料中的潛在結構和模式，這有助於進行後續的資料分析和模型訓練。</p>
        <h3 id="-">圖像分割</h3>
        <p>在圖像處理中，最大割問題可以用來進行圖像分割。通過將圖像中的像素分割成兩個區域，可以識別圖像中的目標物體和背景，這有助於進行圖像識別和目標檢測。</p>
        <h3 id="-">運輸網絡優化</h3>
        <p>在運輸網絡中，最大割問題可以用來優化交通流量。通過將交通網絡分割成兩部分，可以最小化交通擁堵和提高運輸效率，這有助於城市交通管理和規劃。</p>
        <h3 id="-">通訊網絡設計</h3>
        <p>在通訊網絡中，最大割問題可以用來設計網絡拓撲結構。通過將網絡節點分割成兩部分，可以最小化通訊成本和提高網絡可靠性，這有助於構建高效的通訊系統。</p>
        <h3 id="-">資源分配</h3>
        <p>在資源分配中，最大割問題可以用來優化資源的分配策略。通過將資源分割成兩部分，可以最小化資源的浪費和提高分配效率，這有助於實現最佳的資源利用率。</p>
        <h3 id="-">生物網絡分析</h3>
        <p>在生物信息學中，最大割問題可以用來分析生物網絡結構。通過將生物網絡分割成兩部分，可以發現生物系統中的關鍵基因和蛋白質，這有助於理解生物過程和疾病機制。</p>
        

        <vue-latex :expression="'H(x)=\\sum_{(u,v)\\in E}w_{u,v}(-x_u-x_v+2x_u x_v)'" display-mode />
        <h3 id="-">演示</h3>
        你可以在下方輸入
        <div id="networkGraph">
          <textarea v-model="graphInput" placeholder="Enter graph data in 'u v weight' format, one edge per line"></textarea>
          <button @click="handleSubmit">Submit</button>
          <p>{{ mcpBestSample }}</p>
          <div id="container"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Navbar from '../components/Navbar.vue';
  import { solveMCP } from '../api.js'
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
    beforeUnmount() {
    if (this.renderer) {
      this.renderer.kill();
      this.renderer = null;
    }
    },
    methods: {
    initNetwork() {
      const container = this.$el.querySelector('#container');
      if (container) {
        this.graph = new Graph();
        this.renderer = new Sigma(this.graph, container, {
          renderEdgeLabels: true, // 渲染边的标签
        });

        // 添加自定义渲染器以绘制边的标签
        this.renderer.setSetting('edgeLabelsRendered', true);
        this.renderer.setSetting('defaultEdgeLabelSize', 20);
        this.renderer.setSetting('edgeLabelRenderer', drawEdgeLabels);
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
            const [u, v, weight] = line.trim().split(' ');
            if (u && v && weight) {
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
            const [u, v, weight] = line.trim().split(' ');
            if (u && v && weight) {
                this.graph.addEdge(u, v, { weight: parseFloat(weight), label: weight });
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
  
        const result = await solveMCP(requestData)
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
  .mcp {
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
  