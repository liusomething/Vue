<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    //   username() {
    //       return this.$route.params.username;
    //   }
  },
  methods: {
    //   goBack() {
    //       window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    //   }
  }
}
</script>
