<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark" class="navbar" fixed>
      <b-navbar-brand to="/" class="logo">Video Share</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <div class="search m-auto" align="center">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="keyword"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="search()">Search</b-button>
        </div>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="nav-item" v-if="show_login" to="/login">Login</b-nav-item>
          <b-nav-item class="nav-item" v-if="show_login" to="/sign-up">Sign-up</b-nav-item>
          <b-nav-item class="nav-item" v-else @click="clearStorage()">Sign-out</b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>
<script>

export default {
  name: 'navbar',
  data () {
    return {
      show_login: true,
      keyword: ''
    }
  },
  methods: {
    check_token () {
      let token = localStorage.getItem('token')
      if (token) {
        console.log('logged_in')
        this.show_login = !this.show_login
        console.log(this.show_login)
      }
    },
    clearStorage () {
      localStorage.clear()
      this.$router.go()
    },
    search () {
      localStorage.setItem('keyword', this.keyword)
      this.$router.push('/search?keyword=' + this.keyword)
      this.$router.go()
    }
  },
  mounted() {
    this.check_token()
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
// font-family: 'Pacifico', cursive;
// font-family: 'Josefin Sans', sans-serif;
.navbar{
  .logo{
    font-family: 'Pacifico', cursive;
    font-size: 25px;
  }
  .nav-item{
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
    font-size: 18px;
    @media(max-width: 767px){
      text-align: center;
    }
  }
  .search{
    display: flex;
    width: 500px;
    @media(max-width: 767px){
      width: 100%;
      flex-direction: column;
    }
    @media(min-width: 767px) and (max-width: 1020px){
      width: 340px;
    }
    input{
      width: 100%;
    }
  }
}
</style>
