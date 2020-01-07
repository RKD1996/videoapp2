<template>
  <div class="home">
    <h3 class="ml-5 pl-5">New Videos</h3>
    <div class="card-carousel-wrapper">
    <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
    <div class="card-carousel">
      <div class="card-carousel--overflow-container">
        <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
          <div class="card-carousel--card" v-for="item in items"><img @click="openPlayer(item)" :src="item.poster_src"/>
            <div class="card-carousel--card--footer">
              <p @click="openPlayer(item)">{{ item.title }}</p>
              <p class="tag">Views: {{item.views}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      currentOffset: 0,
     windowSize: 5,
     paginationFactor: 220,
     items: []
    }
  },
  computed: {
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
    openPlayer (e) {
      localStorage.setItem('video', JSON.stringify(e))
      this.$router.push('/vp')
    },
    getAllVideos () {
      let vm = this
      axios({
        method: 'get',
        url: 'https://whispering-meadow-49668.herokuapp.com/videos'
      }).then(function (res) {
        vm.items = res.data.videos
        console.log(res.data.videos)
      }).catch(function (err) {
        console.log(err.msg)
      })
    }
  },
  created () {
    this.getAllVideos()
  }
}
</script>
<style lang="scss" scoped>
$vue-navy: #2c3e50;
$vue-navy-light: #3a5169;
$vue-teal: #42b883;
$vue-teal-light: #42b983;
$gray: #666a73;
$light-gray: #f8f8f8;


body {
background: $light-gray;
color: $vue-navy;
font-family: 'Source Sans Pro', sans-serif;
}

.card-carousel-wrapper {
display: flex;
align-items: center;
justify-content: center;
margin: 20px 0 40px;
color: $gray;
}

.card-carousel {
display: flex;
justify-content: center;
width: 80%;

&--overflow-container {
  overflow: hidden;
  @media(min-width: 320px) and (max-width: 767px){
    overflow: visible;
  }
}

&--nav__left,
&--nav__right {
    @media(min-width: 320px) and (max-width: 767px){
      display: none;
    }
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 2px solid $vue-teal;
  border-right: 2px solid $vue-teal;
  cursor: pointer;
  margin: 0 20px;
  transition: transform 150ms linear;
  &[disabled] {
    opacity: 0.2;
    border-color: black;
  }
}

&--nav__left {
  transform: rotate(-135deg);
  &:active {
    transform: rotate(-135deg) scale(0.9);
  }
}

&--nav__right {
  transform: rotate(45deg);
  &:active {
    transform: rotate(45deg) scale(0.9);
  }
}
}

.card-carousel-cards {
display: flex;
transition: transform 150ms ease-out;
transform: translatex(0px);
@media(min-width: 320px) and (max-width: 767px){
  display: block;
}

.card-carousel--card {
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(40,44,53,.06), 0 2px 2px 0 rgba(40,44,53,.08);
  background-color: #fff;
  border-radius: 4px;
  z-index: 3;
  margin-bottom: 2px;
  @media(min-width: 320px) and (max-width: 767px){
    text-align: center;
  }
  &:first-child {
    @media(min-width: 320px) and (max-width: 767px){
      text-align: center;
    }
  }

  &:last-child {
    margin-right: 0;
  }

  img {
    width: 200px;
    height: 150px;
    vertical-align: bottom;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    transition: opacity 150ms linear;
    user-select: none;
      @media(min-width: 320px) and (max-width: 767px){
        width: 280px;
      }

    &:hover {
      opacity: 0.5;
    }
  }

  &--footer {
    border-top: 0;
    padding: 7px 15px;
      @media(min-width: 320px) and (max-width: 767px){
        text-align: center;
      }

    p {
      padding: 3px 0;
      margin: 0;
      margin-bottom: 2px;
      font-size: 19px;
      font-weight: 500;
      color: $vue-navy;
      user-select: none;

      &.tag {
        font-size: 11px;
        font-weight: 300;
        padding: 4px;
        background: rgba(40,44,53,.06);
        display: inline-block;
        position: relative;
        margin-left: 4px;
        color: $gray;

        &:before {
          content:"";
          float:left;
          position:absolute;
          top:0;
          left: -12px;
          width:0;
          height:0;
          border-color:transparent rgba(40,44,53,.06) transparent transparent;
          border-style:solid;
          border-width:8px 12px 12px 0;
      }
        &.secondary {
          margin-left: 0;
          border-left: 1.45px dashed white;
          &:before {
            display: none !important;
          }
        }

        &:after {
          content:"";
          position:absolute;
          top:8px;
          left:-3px;
          float:left;
          width:4px;
          height:4px;
          border-radius: 2px;
          background: white;
          box-shadow:-0px -0px 0px #004977;
        }
      }
    }
  }
}
}

h1 {
font-size: 3.6em;
font-weight: 100;
text-align: center;
margin-bottom: 0;
color: $vue-teal;
}
</style>
