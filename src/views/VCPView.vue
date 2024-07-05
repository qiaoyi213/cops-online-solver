<template>
    <div>
      <Navbar />
      <div id="networkGraph">
        <textarea v-model="graphInput" placeholder="Enter graph data in 'u v' format, one edge per line"></textarea>
        <button @click="handleSubmit">Submit</button>
        <p>{{ mcpBestSample }}</p>
        <div id="container"></div>
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
  