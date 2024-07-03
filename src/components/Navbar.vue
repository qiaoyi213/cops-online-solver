<template>
    <div class="navbar">
        <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
   
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item active">
                  <router-link to="/ssp" class="nav-link">Subset Sum</router-link>
                </li>
                <li class="nav-item active">
                  <router-link to="/mcp" class="nav-link">Max Cut</router-link>
                </li>
                <li class="nav-item active">
                  <router-link to="/vcp" class="nav-link">Vertex Cover</router-link>
                </li>
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">01 Knapsack</router-link>
                </li>
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">Graph Coloring</router-link>
                </li>
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">Hamiltonian Cycle</router-link>
                </li>
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">Travelling Salesperson</router-link>
                </li>
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">Job Shop Scheduling</router-link>
                </li>
              </ul>
          </div>
      </nav>
    </div>
  </template>
   
  <script>
  export default {
    name: 'Navbar',
    props: {
      msg: String
    },
  }
  </script>
   
  <style scoped lang="scss">
    @media (min-width: 992px) { 
      .navbar.custom-nav{
        padding-top:16px;
        padding-bottom:16px;
        background-color: #7DA79D !important;
      }
     }
  </style>