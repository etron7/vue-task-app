import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '../views/Create.vue'
import List from '../views/List.vue'
import Task from '../views/Task.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Create',
    component: Create
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: Task
  }
]

const router = new VueRouter({
  routes
})

export default router
