import Vue from "vue";
import VueRouter from "vue-router";

/*注意事件
1、如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用 beforeRouteUpdate 来响应这个变化 (比如抓取用户信息)。 

*/
// 1、定义路由组件，可以从其他文件 import 进来
import Home from "../views/Home.vue";

// 0、如果使用模块化机制编程，导入vue和vueRouter，要调用Vue.use(VueRouter);
Vue.use(VueRouter);

/* 2、定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
*/
// 匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    //   匹配任意路径，我们可以使用通配符 (*)：
    path: "/math-*",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    //   动态路由参数以冒号：开头
    // 一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。
    path: "/help/:pathUrl",
    name: "help",
    component: () => import("../views/Help.vue"),
    children: [
      {
        // 当 /user/:pathUrl/profile 匹配成功，
        // UserProfile 会被渲染在 Help 的 <router-view> 中
        path: "profile",
        component: () => import("../views/Help.vue")
      },
      {
        // 当 /user/:pathUrl/posts 匹配成功
        // UserPosts 会被渲染在 Help 的 <router-view> 中
        path: "posts",
        component: () => import("../views/Help.vue")
      }
      // 当 /user/:id 匹配成功，
      // 空的 子路由 会被渲染在 Help 的 <router-view> 中
      //   { path: "", component: () => import("../views/Help.vue") }
    ],
    props: true
  },
  {
    path: "/user/test",
    name: "test",
    //   redirect: {name: 'help'}, //重定向路径
    alias: "/user/test_alias", //别名
    component: () => import("../views/Test.vue"),
    props: {
      default: true
      //   sidebar: false
    },
    beforeEnter: (to, from, next) => {
      next();
    },
    meta: {requireAuth: true}
  }
];

// 3. 创建 router 实例，然后传 `routes` 配置,你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, //这里是缩写，相当于 routes:routes
  scrollBehavior(to, from, savedPosition){
    // return 期望滚动到哪个的位置
    // if (savedPosition) {
    //     return savedPosition;
    // } else {
    //     return {x:0, y:0};
    // }
    // if(to.hash) {
    //     return {
    //         selector: to.hash
    //     }
    // }
    // 异步滚动
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve({x:0, y:0})
        }, 500)
    })
  }
});

// “导航”表示路由正在发生改变。
// 全局前置守卫
router.beforeEach((to, from, next) => {
  next();
    // if(to.matched.some(record => record.meta.requireAuth)) {
    //     if (!auth.loggedIn()) {
    //         next({
    //             path: '/login',
    //             query: {redirect: to.fullPath}
    //         })
    //     } else {
    //         next();
    //     }
    // } else {
    //     next();
    // }
});
// 全局解析守卫
router.beforeResolve((to, from, next) => {
  next();
});

// 全局后置守卫
// router.afterEach((to, from) => {
    
// });

/*

// 想要导航到不同的 URL，则使用 router.push 方法。
// 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
// 如果提供了 path，params 会被忽略，
// 字符串 、描述地址的对象
router.push('home');
router.push({path:'home'});
router.push({name:'user', params:{userId:'123'}});
router.push({path:'register', query: {plan: 'private'}});
window.history.pushState('homa')
// 替换当前的路由
router.replace('home');
window.history.replaceState('home')
// 在 history 记录中向前或者后退多少步
window.history.go(1); // = history.forward()
window.history.g0(-1); // = history.back()

vue-router默认hash模式
*/

// 导入路由对象
export default router;
