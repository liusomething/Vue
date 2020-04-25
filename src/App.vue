<template>
  <div id="app">
    <div id="nav">
      <!-- 当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active。 -->
      <!-- 通过传入 `to` 属性指定链接. -->

      <router-link to="/">Home</router-link> |
      <router-link to="/math-about/about">About</router-link> :
      <!-- <router-link to="/user/help">Help</router-link> -->
      <router-link :to="{name: 'help', params:{pathUrl: 123}}">Help</router-link> ~
      <router-link to="/user/test">Test</router-link>
    </div>

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition :name = "transitionName">
        <router-view></router-view>
    </transition>
    <!-- <router-view class="view" name="a"></router-view> -->
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
