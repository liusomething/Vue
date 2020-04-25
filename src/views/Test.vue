<template>
  <div class="test">
    <h1>This is an Test page</h1>
    <!-- 高内聚、低耦合 使用props(少用$params) -->
    User: {{ this.pathUrl }}
    <!-- <router-view></router-view> -->

    <div v-if='loading' class="loading">
        Loading
    </div>
    <div v-if='error' class="error">
        {{error}}
    </div>
    <div v-if='post' class="content">
        <h2>{{post.title}}</h2>
        <p>{{post.body}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  props: ["pathUrl"],
  data: function(){
      return {
          loading: false,
          post: null,
          error: null
      }
  },
  created(){
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
        '$route': 'fetchData'
  },
  methods: {
    fetchData() {
        this.error = this.post = null;
        this.loading = true;
        getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  },  
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // next(vm => {
    //      // 通过 `vm` 访问组件实例
    // })
    // next();
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // this.name = to.params.name;
    // next();
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
    if (answer) {
        next();
    } else {
        next(false);
    }
  }
};
</script>

<style>
.test {
  margin: 5px;
  color: red;
}
</style>
