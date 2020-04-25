<template>
  <div class="help">
    <h1>This is an help page</h1>
    User: {{ this.pathUrl }}
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "help",
        props: ['pathUrl'],
        mounted() {
            console.log(this)
        }
    }
</script>
