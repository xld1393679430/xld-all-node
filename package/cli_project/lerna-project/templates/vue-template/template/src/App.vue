<template>
  <div id="app">
    <h1>Hello CLI</h1>
    <HelloWorld msg="i am HelloWorld Component" />
    <%_ if(data.mode === 1) { _%>
    <div>111</div>
    <%_ } else { _%>
    <div>222</div>
    <%_ } _%>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
