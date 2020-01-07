<template>
  <div id="app">
      <Nav/>
      <div class="body">
        <router-view/>
      </div>
  </div>
</template>
<script>
  import Nav from '@/components/Navbar'

  export default {
    name: 'App',
    components: {
      Nav
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
  .body{
    padding: 15px;
    font-family: 'Josefin Sans', sans-serif;
  }
</style>
