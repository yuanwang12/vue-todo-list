import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import FormList from '@/components/FormList.vue'
import TodoList from '@/components/todoList/TodoList.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/formlist',
      name: 'FormList',
      component: FormList
    },
    {
      path: '/todoList',
      name: 'TodoList',
      component: TodoList
    }
  ]
})
export default router;
