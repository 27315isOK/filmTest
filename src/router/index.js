import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/movie',
    component: Home,
    children: [
      {
        path: 'movie',
        name: 'movie',
        redirect: '/movie/hot',
        component: () => import('../views/home/movie.vue'),
        children: [
          {
            path: 'hot',
            name: 'hot',
            component: () => import('../views/home/hot.vue')
          },
          {
            path: 'soon',
            name: 'soon',
            component: () => import('../views/home/soon.vue')
          }
        ]
      },
      {
        path: 'cinema',
        name: 'cinema',
        component: () => import('../views/home/cinema.vue'),
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('../views/home/news.vue')
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('../views/home/mine.vue')
      },
      {
        path:'city',
        name:'city',
        component:()=> import('../views/city.vue')
      }
    ]
  },
  {
    path: '/info/:id',
    name: 'info',
    component: () => import('../views/info.vue')
  },
  {
    path: '/cinfo/:id',
    name: 'cinfo',
    component: () => import('../views/cinfo.vue'),
    children:[
      {
        path:':fid/:time?', //fid 电影id   ; :time  播放的时间日期
        component: ()=> import('../views/schedule.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
