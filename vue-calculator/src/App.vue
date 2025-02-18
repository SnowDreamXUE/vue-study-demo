<template>
    <div id="app">
        <div class="cat" />
        <Calculator />
    </div>
</template>

<script>
import Calculator from './components/calculator.vue'

export default {
    name: 'App',
    components: {
        Calculator
    }
}
</script>

<style>
.cat {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 219px;
    height: 273px;
    background-image: url(https://www.helloimg.com/i/2024/09/30/66fa5068affb5.png);
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
}

body {
    background-color: #d1e8f1;
    margin: 0;
    padding: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .cat {
        width: 110px;
        height: 137px;
    }
}
</style>
