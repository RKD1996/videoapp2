<template>
  <div class="">
    <div v-if="result_found">
      <h3 class="mb-3 mt-3 ml-4 pl-2">Result Found for '{{key}}'</h3>
      <div v-for="t in search_result"  :key="t.id">
        <b-card :img-src="t.poster_src" :img-alt="t.title" img-left class="mb-3 vid-card" @click="openPlayer(t)">
          <b-card-text>
            <span> <b>{{t.title}}</b> </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Posted at - {{dateFilter(t.updated_at)}}</span>
            <span class="views">Views: <span class="view-count">{{t.views}}</span> </span>
          </b-card-text>
        </b-card>
      </div>
    </div>
    <div v-else>
      <h1>no result found</h1>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

  export default {
    props: ['keyword'],
    data () {
      return {
        search_result: {},
        result_found: true,
        key: ''
      }
    },
    methods: {
      dateFilter (e) {
        var d = new Date(e),
           month = '' + (d.getMonth() + 1),
           day = '' + d.getDate(),
           year = d.getFullYear();

       if (month.length < 2)
           month = '0' + month;
       if (day.length < 2)
           day = '0' + day;

       return [year, month, day].join('-');
     },
      openPlayer (e) {
        localStorage.setItem('video', JSON.stringify(e))
        this.$router.push('/vp')
      },
      getSearchData(e) {
        let vm = this
        axios({
          method: 'get',
          url: 'https://whispering-meadow-49668.herokuapp.com/videos/search?keyword=' + e
        }).then(function (res) {
          vm.search_result = res.data.result
          if (vm.search_result.length > 0) {
            vm.result_found = true
            vm.key = localStorage.getItem('keyword')
          } else {
            vm.result_found = false
          }
        }).catch(function (err) {
          console.log(err.data)
        })
      }
    },
    created () {
      console.log(localStorage.getItem('keyword'))
      this.getSearchData(localStorage.getItem('keyword'))
    }
  }
</script>
<style lang="scss" scoped>
  .vid-card{
    height: 60px;
    width: 80%;
    margin: 5px auto;
    cursor: pointer;
    transition: .5s;
    @media(min-width: 320px) and (max-width: 767px){
      width: 100%;
    }
    img{
      height: 60px;
      width: 60px;
    }
    .card-body{
      padding: 5px 20px;
      display: flex;
      align-items: center;
      justify-content:space-between;
      .card-text{
        width: 100%;
        @media(min-width: 320px) and (max-width: 360px){
          font-size: 13px;
        }
        .views{
          float: right;
        }
      }
    }
    &:hover{
      background-color: #eee;
    }
  }
</style>
