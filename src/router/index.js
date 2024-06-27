import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TasksView from '../views/TasksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      children: [
        {
          path: '',
          name: 'task-list',
          component: () => import('../components/tasks/TaskList.vue')
        },
        {
          path: ':id',
          props: true,
          name: 'task-details',
          component: () => import('../components/tasks/TaskDetails.vue')
        },
        {
          path: 'new',
          name: 'new-task',
          component: () => import('../components/tasks/NewTask.vue')
        },
        {
          path: ':id/edit',
          props: true,
          name: 'edit-task',
          component: () => import('../components/tasks/EditTask.vue')
        }
      ]
    }
  ]
})

export default router
