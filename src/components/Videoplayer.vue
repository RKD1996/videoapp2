<template>
  <div class="video-player">
     <video id="video" autoplay="auto" controls ref="videoPlayer" class="video-js" @ended="onEnd(vid)">
       <!-- <source :src="vid.src" :type="vid.content_type"> -->
     </video>
     <div class="video-list">
       <div v-for="v in vid_list">
         <b-card :img-src="v.poster_src" :img-alt="v.title" img-left class="mb-3 vid-card" @click="playVid(v)">
           <b-card-text>
             <p> <b>{{v.title}}</b> </p>
             <p>Posted at - {{dateFilter(v.updated_at)}}</p>
             <p>Views: <span class="view-count">{{v.views}}</span> </p>
           </b-card-text>
         </b-card>
       </div>
     </div>
  </div>
</template>
<script>
import videojs from 'video.js'
import axios from 'axios'

export default {
  data () {
    return {
      player: null,
      vid: {},
      vid_list: {}
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
    initializePlayer () {
      this.vid = JSON.parse(localStorage.getItem('video'))
      let videoOptions = {
        controls: true,
        sources: [{
          src: this.vid.src,
          type: this.vid.content_type
        }]
      }
      this.player = videojs('video', videoOptions)
      this.player.addClass('vjs-matrix')
      console.log(this.player)
    },
    getAllVideoData () {
      let vm = this
      axios({
        method: 'get',
        url: 'https://whispering-meadow-49668.herokuapp.com/videos'
      }).then(function (res) {
        vm.vid_list = res.data.videos
      }).catch(function (err) {
        console.log(err.msg)
      })
    },
    playVid (e) {
      this.vid = e
      this.player.src({
        src: e.src,
        type: e.content_type
      })
      this.player.play()
    },
    onEnd (e) {
      console.log('ended')
      console.log(e)
      let vm = this
      axios({
        method: 'get',
        url: 'https://whispering-meadow-49668.herokuapp.com/videos/view_count_update/' + e.id
      }).then(function (res) {
        vm.getAllVideoData()
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    this.initializePlayer()
    this.getAllVideoData()
  },
  beforeDestroy () {
    this.player.dispose()
  }
}
</script>
<style lang="scss" scoped>
  .video-player {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    #video{
      flex-basis: 60%;
      height: 500px;
      @media(min-width: 320px) and (max-width: 767px){
        flex-basis: 100%;
        height: 250px;
      }
    }
    .vjs-matrix.video-js{
      background: #000;
      position: relative;
    }
    .video-js .vjs-control{
      background: white !important;
    }
    .video-list{
      @media(min-width: 320px) and (max-width: 767px){
        flex-basis: 100%;
        margin-top: 15px;
      }
      flex-basis: 40%;
      overflow: hidden;
      height: 500px;
      overflow-y: scroll;
      .vid-card{
        width: 96%;
        padding: 15px;
        margin: 10px;
        cursor: pointer;
      }
      p{
        margin: 0;
      }
      img{
        height: 100px;
        width: 100px;
      }
        &::-webkit-scrollbar {
          width: 5px;
        }

        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px grey;
          border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background: #424757;
          border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #b30000;
        }
    }
  }
</style>
