<template>
  <div class="sign-up">
    <br>
    <br>
    <div align="center">
      <b-card title="Sign-Up" style="max-width: 25rem;" class="mb-2">
      <b-card-text>
        <b-form-input placeholder="Name" v-model="user.name"></b-form-input>
        <b-form-input type="email" placeholder="Email (example@example.com)" v-model="user.username"></b-form-input>
        <span v-if="isEmail">Not an Email</span>
        <div class="password">
          <b-form-input :type="input_type" placeholder="Password (minimum 6 characters)" v-model="user.password_digest"></b-form-input>
          <i class="material-icons" v-if="!visibility" @click="showPassword()">visibility</i>
          <i class="material-icons" v-else @click="showPassword()">visibility_off</i>
        </div>
        <b-form-input :type="input_type" placeholder="Confirm Password" v-model="c_pass" :change="confirmPassword()"></b-form-input>
        <span v-if="pass_match">password does not match</span>
      </b-card-text>
      <b-button href="#" variant="primary" @click="submit()">Create Account</b-button>
    </b-card>
  </div>
</div>
</template>
<script>
import axios from 'axios'


  export default {
    data () {
      return {
        c_pass: '',
        user: {
          name: '',
          username: '',
          password_digest: ''
        },
        input_type: 'password',
        visibility: true,
        pass_match: false,
        isEmail: false
      }
    },
    methods: {
      showPassword () {
        this.visibility = !this.visibility
        if (this.visibility) {
          this.input_type = 'text'
        } else {
          this.input_type = 'password'
        }
      },
      submit () {
        this.isEmail = (this.user.username.match('@') && this.user.username != '')? true:false
        if (this.user.password_digest.length >= 6 && this.isEmail) {
          this.isEmail = false
          let vm = this
          axios({
            method: 'post',
            url: 'https://whispering-meadow-49668.herokuapp.com/users',
            data: {
              'user': vm.user
            }
          }).then(function (res) {
            console.log(res)
          }).cath(function (err) {
            console.log(err)
          })
        } else  if (this.user.password_digest.length < 6) {
            this.pass_match = true
        } else if (!this.isEmail) {
          this.isEmail = true
        }
      },
      confirmPassword () {
        if (this.user.password_digest == this.c_pass) {
          this.pass_match = false
        } else {
          this.pass_match = true
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.sign-up{
  input{
    margin-top: 5px;
  }
  .password {
    display: flex;
    align-items: center;
    i{
      margin-left: -30px;
    }
  }
}
</style>
